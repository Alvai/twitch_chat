import express from "express";
import WebSocket from "ws";

const app = express();

app.use(express.json());

app.get("/", (_, res) => res.json({ message: "Twitch Chat API" }));

const server = app.listen(process.env.port || 3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`)
);

// create websocket server using the express server
const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws) {
  // on connection, set the message handler for the websocket
  ws.on("message", function incoming(data) {
    // broadcast the message to all clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });
});
