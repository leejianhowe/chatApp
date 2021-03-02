const express = require("express");
const expressWs = require("express-ws");

const PORT = 3000;

const app = express();
expressWs(app);

const connections = new Set();

const wsHandler = (ws, req) => {
  const name = req.query.name;
  ws.participantName = name;
  console.log(`${name} connected`);
  connections.add(ws);
  for (x of connections) {
      console.log(x.participantName)
    if (x.participantName != name) {
      x.send(name + " joined");
    }
  }

  ws.on("message", (message) => {
    connections.forEach((conn) => conn.send(message + conn.participantName));
  });

  ws.on("close", () => {
    console.log(`${ws.participantName} disconnected`);
    connections.delete(ws);
    connections.forEach((conn) =>
      conn.send(`${ws.participantName} disconnected`)
    );
  });
};

app.ws("/chat", wsHandler);

app.use(express.static("build"));

app.listen(PORT, () => {
  console.log(`APP started on ${PORT} on ${new Date()}`);
});
