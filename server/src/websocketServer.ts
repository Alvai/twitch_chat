import { Server } from "node:http";
import { parse as parseURL } from "node:url";
import { WebSocket } from "ws";
import {
  findOrCreateChannel,
  loadPreviousMessages,
  saveMessageToChannel,
} from "./models/channel";

type WebsocketWithChannel = WebSocket & { channel: string };

const initWebsocketServer = (server: Server) => {
  // create websocket server using the express server
  const wss = new WebSocket.Server({ server });

  wss.on("connection", async function connection(ws, req) {
    // parse the channel from the URL
    const channel = parseURL(req.url!, true).query.channel;

    if (!channel || typeof channel !== "string") {
      ws.send(
        JSON.stringify({
          eventType: "error",
          payload: { message: "channel parameter is required" },
        })
      );

      return;
    }

    // TODO: store current channel in another way
    // Store the channel in the websocket object for each connection
    (ws as WebsocketWithChannel).channel = channel;

    await findOrCreateChannel(channel);

    // when the connection is established, send the last 20 messages to the client
    const initialMessages = await loadPreviousMessages(channel);
    ws.send(
      JSON.stringify({
        eventType: "initial_message",
        payload: {
          messages: initialMessages,
        },
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
      await saveMessageToChannel(channel, { message, username });

      // broadcast the message to all clients
      wss.clients.forEach(function each(client) {
        // check if the client is in the same channel as the current connection
        const isSameChannel =
          (client as WebsocketWithChannel).channel ===
          (ws as WebsocketWithChannel).channel;

        // send the messages to clients that are open and on the same channel
        if (client.readyState === WebSocket.OPEN && isSameChannel) {
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
