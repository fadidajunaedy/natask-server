const server = require("./application/server.js");

const { getSocket } = require("./config/socket.js");
const socket = getSocket();

const { clientSubscriptions } = require("./services/subtaskService.js");

socket.on("connection", (ws, req) => {
  ws.send(JSON.stringify({ success: true, message: "WS Connect Success" }));

  ws.on("message", (message) => {
    const { event, payload } = JSON.parse(message);

    if (event === "subscribe") {
      if (Array.isArray(payload)) {
        payload.forEach((_id) => {
          if (!clientSubscriptions.includes(_id)) {
            clientSubscriptions.push({ _id, client: ws });
          }
        });
      }
    }
  });

  ws.on("close", () => {
    for (let i = clientSubscriptions.length - 1; i >= 0; i--) {
      if (clientSubscriptions[i].client === ws) {
        clientSubscriptions.splice(i, 1);
      }
    }
  });
});

server.listen(3000, () => console.log("Server start in port 3000"));
