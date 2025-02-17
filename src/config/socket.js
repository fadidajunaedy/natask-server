const WebSocket = require("ws");

let socket;

const initSocket = (server) => {
  socket = new WebSocket.Server({ server });
};

const getSocket = () => {
  if (!socket) throw new Error("Web Socket is not initialized!");
  return socket;
};

module.exports = { initSocket, getSocket };
