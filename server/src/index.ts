import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_, res) => res.json({ message: "Twitch Chat API" }));

const server = app.listen(process.env.port || 3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`)
);
