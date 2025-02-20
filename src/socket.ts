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
    transports: ['websocket', 'polling'],
    pingTimeout: 60000,
    pingInterval: 25000,
    allowEIO3: true,  // Enable older engine.io protocol versions
    perMessageDeflate: {
      zlibDeflateOptions: {
        chunkSize: 1024,
        memLevel: 7,
        level: 3,
      },
      zlibInflateOptions: {
        chunkSize: 10 * 1024,
      },
      threshold: 1024,
      concurrencyLimit: 10,
      disable: true,  // Ensure per-message deflate is fully disabled
    }
  });

  io.engine.on("connection_error", (err) => {
    console.log("Connection error:", err);
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


