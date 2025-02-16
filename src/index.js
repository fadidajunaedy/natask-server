const { getSocket } = require("./config/socket.js")
const server = require("./application/server.js")

const socket = getSocket()
socket.on('connection', (ws, req) => {
    ws.send(JSON.stringify({ success: true, message: "WS Connect Success" }))
})

server.listen(3000, () => console.log("Server start in port 3000"))