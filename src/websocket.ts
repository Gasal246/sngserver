import { Server as HttpServer } from "http";
import { WebSocket, WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";
import {
  executeSocketDisconnetion,
  getExpoTokenByUserId,
} from "./services/socketQueries";
import { sendSigninCodesPushNotification } from "./services/notification";

interface VerificationSession {
  kioskWs: WebSocket;
  userId: string;
}

interface WebSocketMessage {
  type: string;
  payload: any;
}

const verificationSessions = new Map<string, VerificationSession>();
let wss: WebSocketServer;

export const initWebSocket = (server: HttpServer): void => {
  console.log("WebSocket Server Initializing...");

  wss = new WebSocketServer({ server });

  // Error handling for the WebSocket server
  wss.on("error", (error: any) => {
    console.error("WebSocket Server Error:", error);
  });

  wss.on("connection", (ws: WebSocket) => {
    const clientId = uuidv4();
    console.log(`New WebSocket connection (${clientId})`);

    // Set up ping-pong for connection health monitoring
    const pingInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.ping();
      }
    }, 10000);

    // gasal - Uncomment below snippet to check client connection
    // ws.on('pong', () => {
    //   console.log(`Received pong from client ${clientId}`);
    // });

    ws.on("message", async (data: string) => {
      try {
        const message: WebSocketMessage = JSON.parse(data.toString());

        switch (message.type) {
          case "sendVerification": {
            const { userId } = message.payload;
            const expo_token = await getExpoTokenByUserId(userId);

            if (!expo_token) {
              console.log("No Expo token found!");
              ws.send(
                JSON.stringify({
                  type: "error",
                  payload: { message: "No Expo token found" },
                })
              );
              return;
            }

            const verificationSessionId = uuidv4();
            verificationSessions.set(verificationSessionId, {
              kioskWs: ws,
              userId: userId,
            });

            await sendSigninCodesPushNotification(
              expo_token,
              "Verify your account access!",
              {
                type: "verification",
                verificationSessionId,
                userId,
              }
            );

            ws.send(
              JSON.stringify({
                type: "displayCode",
                payload: { userId, verificationSessionId },
              })
            );
            break;
          }

          case "submitVerification": {
            const { verificationSessionId, confirm } = message.payload;
            const session = verificationSessions.get(verificationSessionId);

            if (!session) {
              console.log("No verification session found");
              return;
            }

            if (session.kioskWs.readyState === WebSocket.OPEN) {
              session.kioskWs.send(
                JSON.stringify({
                  type: confirm ? "verificationSuccess" : "verificationFailed",
                  payload: { userId: session.userId },
                })
              );
            }

            console.log("Verification state sent");
            verificationSessions.delete(verificationSessionId);
            break;
          }
        }
      } catch (error) {
        console.error("Error processing message:", error);
        ws.send(
          JSON.stringify({
            type: "error",
            payload: { message: "Internal server error" },
          })
        );
      }
    });

    ws.on("close", async () => {
      console.log(`Client disconnected (${clientId})`);
      clearInterval(pingInterval);
      await executeSocketDisconnetion(clientId);

      // Clean up any verification sessions for this connection
      for (const [sessionId, session] of verificationSessions.entries()) {
        if (session.kioskWs === ws) {
          verificationSessions.delete(sessionId);
        }
      }
    });

    ws.on("error", (error) => {
      console.error(`WebSocket error for client ${clientId}:`, error);
    });
  });

  // Clean up on server close
  server.on("close", () => {
    wss.close();
  });
};
