
(function () {
  const socket = io();

  // read username & room from query
  const params = new URLSearchParams(window.location.search);
  const username = params.get("username") || `Guest${Math.floor(Math.random()*1000)}`;
  const room = params.get("room") || "default";

  // elements
  const messagesEl = document.getElementById("messages");
  const msgInput = document.getElementById("msgInput");
  const sendBtn = document.getElementById("sendBtn");
  const usersListEl = document.getElementById("usersList");
  const roomNameEl = document.getElementById("roomName");
  const leaveBtn = document.getElementById("leaveBtn");
  const notifSound = document.getElementById("notifSound");

  roomNameEl.textContent = room;

  // request Notification permission if needed
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission().catch(()=>{});
  }

  // join room
  socket.emit("joinRoom", { username, room });

  function escapeHtml(s) {
    return String(s || "").replace(/[&<>"']/g, function (m) {
      return ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[m];
    });
  }

  function appendMessage(msg) {
    const el = document.createElement("div");
    el.className = "message" + (msg.system ? " system" : "");
    const time = new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (msg.system) {
      el.innerHTML = `<div class="meta system-meta">${escapeHtml(msg.text)} <span class="time">${time}</span></div>`;
    } else {
      el.innerHTML = `<div class="meta"><strong>${escapeHtml(msg.username)}</strong> <span class="time">${time}</span></div>
                      <div class="text">${escapeHtml(msg.text)}</div>`;
    }
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function updateUsers(users) {
    usersListEl.innerHTML = "";
    users.forEach(u => {
      const li = document.createElement("li");
      li.textContent = u.username;
      usersListEl.appendChild(li);
    });
  }

  function notifyNewMessage(title, body) {
    if (document.hidden && "Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body });
    }
    if (!document.hidden) return;
    try { notifSound.currentTime = 0; notifSound.play(); } catch(e) {}
  }

  socket.on("message", (msg) => {
    appendMessage(msg);
    if (!msg.system && msg.username !== username) notifyNewMessage(`${msg.username} — ${room}`, msg.text);
  });

  socket.on("roomData", ({ room: r, users }) => {
    updateUsers(users);
  });

  // send
  sendBtn.addEventListener("click", sendMessage);
  msgInput.addEventListener("keypress", (e) => { if (e.key === "Enter") sendMessage(); });

  function sendMessage() {
    const text = msgInput.value.trim();
    if (!text) return;
    socket.emit("chatMessage", { text });
    msgInput.value = "";
    msgInput.focus();
  }

  leaveBtn.addEventListener("click", () => {
    socket.emit("leaveRoom");
    window.location.href = "/";
  });

  window.addEventListener("beforeunload", () => { socket.emit("leaveRoom"); });
})();
