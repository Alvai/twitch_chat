// load the env
import "dotenv/config";

import express from "express";
import { getDBconn, initDBcon } from "./db/db";
import { initWebsocketServer } from "./websocketServer";

const app = express();

app.use(express.json());

app.get("/", (_, res) => res.json({ message: "Twitch Chat API" }));

// init the database connection and start the server
initDBcon().then(() => {
  const server = app.listen(process.env.port || 3000, () =>
    console.log(`🚀 Server ready at: http://localhost:3000`)
  );

  initWebsocketServer(server);

  // when the server is closed, close the database connection
  server.on("close", async () => {
    const dbcon = await getDBconn();
    dbcon.close();
  });
});
