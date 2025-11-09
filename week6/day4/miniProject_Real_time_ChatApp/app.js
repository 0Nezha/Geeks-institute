const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

const users = new Map(); // socketId -> { username, room }

function usersInRoom(room) {
  const arr = [];
  for (const [id, u] of users.entries()) if (u.room === room) arr.push({ id, username: u.username });
  return arr;
}

io.on("connection", (socket) => {
  // joinRoom: { username, room }
  socket.on("joinRoom", ({ username, room }) => {
    if (!username || !room) return;
    username = String(username).trim().slice(0, 30);
    room = String(room).trim().slice(0, 40);

    users.set(socket.id, { username, room });
    socket.join(room);

    // notify room
    io.to(room).emit("message", { system: true, text: `${username} joined the room.`, time: new Date().toISOString() });
    io.to(room).emit("roomData", { room, users: usersInRoom(room) });
  });

  // chatMessage: { text }
  socket.on("chatMessage", ({ text }) => {
    const u = users.get(socket.id);
    if (!u) return;
    const msg = { system: false, username: u.username, text: String(text).slice(0, 1000), time: new Date().toISOString() };
    io.to(u.room).emit("message", msg);
  });

  // leaveRoom (explicit)
  socket.on("leaveRoom", () => {
    const u = users.get(socket.id);
    if (!u) return;
    const { username, room } = u;
    socket.leave(room);
    users.delete(socket.id);
    io.to(room).emit("message", { system: true, text: `${username} left the room.`, time: new Date().toISOString() });
    io.to(room).emit("roomData", { room, users: usersInRoom(room) });
  });

  // disconnect
  socket.on("disconnect", () => {
    const u = users.get(socket.id);
    if (!u) return;
    const { username, room } = u;
    users.delete(socket.id);
    io.to(room).emit("message", { system: true, text: `${username} disconnected.`, time: new Date().toISOString() });
    io.to(room).emit("roomData", { room, users: usersInRoom(room) });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server running: http://localhost:${PORT}`));
