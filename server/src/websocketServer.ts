import { Server } from "http";
import { WebSocket } from "ws";
import { loadPreviousMessages, saveMessageToChannel } from "./models/channel";

const initWebsocketServer = (server: Server) => {
  // create websocket server using the express server
  const wss = new WebSocket.Server({ server });

  wss.on("connection", async function connection(ws) {
    // when the connection is established, send the last 20 messages to the client
    const initialMessages = await loadPreviousMessages("main");
    ws.send(
      JSON.stringify({
        eventType: "initial_message",
        payload: { messages: initialMessages },
      })
    );

    // on connection, set the message handler for the websocket
    ws.on("message", async function incoming(data) {
      const { username, message } = JSON.parse(data.toString());

      // if username or message is missing, send an error message to the client
      if (!username || !message) {
        ws.send(
          JSON.stringify({
            eventType: "error",
            payload: { message: "username and message are required" },
          })
        );
      }

      // save the message to the database
      await saveMessageToChannel("main", { message, username });

      // broadcast the message to all clients
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              eventType: "new_message",
              payload: { username, message },
            })
          );
        }
      });
    });
  });
};

export { initWebsocketServer };
