import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { executeSocketDisconnetion, getExpoTokenByUserId, getSocketId } from "./services/socketQueries";
import { sendSigninCodesPushNotification } from "./services/notification";
import { v4 as uuidv4 } from 'uuid';

let io: Server;
const verificationSessions = new Map<string, { kioskSocketId: string, userId: string }>();

export const initSocket = (server: HttpServer): void => {
  console.log("Socket Initialized..")
  
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
    // Transport Configuration
    transports: ['websocket'],           // WebSocket only for better stability
    allowUpgrades: false,                // Prevent transport upgrades
    pingTimeout: 30000,                  // 30 seconds ping timeout
    pingInterval: 10000,                 // 10 seconds ping interval
    connectTimeout: 30000,               // 30 seconds connection timeout
    
    // Protocol Configuration
    allowEIO3: true,                     // Support Socket.IO v3 clients
    maxHttpBufferSize: 1e6,              // 1MB max message size
    
    // Compression Configuration
    perMessageDeflate: false,            // Disable WebSocket compression
    httpCompression: false,              // Disable HTTP compression
    
    // Connection Configuration
    cookie: false,                       // Don't use cookies
    serveClient: false,                  // Don't serve client files
  });

  // Error handling
  io.engine.on("connection_error", (err) => {
    console.log("Connection error:", err);
    // Clean up the problematic request
    if (err.req) {
      err.req.destroy();
    }
  });

  // Handle engine errors
  io.engine.on("error", (err) => {
    console.log("Engine error:", err);
  });

  // Clean up on server close
  server.on('close', () => {
    io.close();
  });

  io.on("connection", (socket: Socket) => {
    console.log("New connection attempt...");
    console.log("Device connected with ID:", socket.id);
    console.log("Connection details:", {
      transport: socket.conn.transport.name,
      headers: socket.handshake.headers,
      query: socket.handshake.query,
      time: new Date().toISOString()
    });

    // Handle disconnection
    socket.on('disconnect', (reason) => {
      console.log(`Client ${socket.id} disconnected, reason: ${reason}`);
      socket.removeAllListeners();
    });

    // Handle socket errors
    socket.on('error', (error) => {
      console.log(`Socket error for ${socket.id}:`, error);
      socket.disconnect(true);
    });

    // Monitor connection health
    socket.conn.on('packet', (packet) => {
      if (packet.type === 'ping') {
        console.log(`Ping received from ${socket.id}`);
      }
    });

    // Kiosk requests verification for a user
    socket.on("sendVerification", async ({ userId }: { userId: string }) => {
      try {
        const expo_token = await getExpoTokenByUserId(userId);
        if (!expo_token) {
          console.log("No Expo token found!");
          return;
        }
    
        const verificationSessionId = uuidv4();
        verificationSessions.set(verificationSessionId, {
          kioskSocketId: socket.id,
          userId: userId
        });
    
        await sendSigninCodesPushNotification(
          expo_token, 
          `Verify your account access!`,
          { 
            type: 'verification',
            verificationSessionId,
            userId
          }
        );
    
        socket.emit("displayCode", { userId, verificationSessionId });
    
      } catch (error) {
        console.error("Error handling verification:", error);
      }
    });

    // connection from user app -- for submitting the verification.
    socket.on("submitVerification", ({ verificationSessionId, confirm }) => {
      console.log("Submitted Verification!")
      const session = verificationSessions.get(verificationSessionId);
      console.log("session: ", session);
      if (!session) return;
  
      const kioskSocket = io.sockets.sockets.get(session.kioskSocketId);

      if (kioskSocket) {
        confirm
          ? kioskSocket.emit("verificationSuccess", { userId: session.userId })
          : kioskSocket.emit("verificationFailed", { userId: session.userId });
      }
      console.log("verification state sended")
      verificationSessions.delete(verificationSessionId);
    });

    socket.on("disconnect", async () => {
      console.log("User disconnected:", socket.id);
      console.log("Device disconnected:", socket.id);
      await executeSocketDisconnetion(socket.id);
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  });
};


