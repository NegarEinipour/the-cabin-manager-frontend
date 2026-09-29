import { io } from "socket.io-client";

// VITE_API_URL is something like "https://.../api/v1"
// Socket.IO needs the origin only, so strip the path
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";
const SOCKET_URL = API_URL.replace(/\/api\/v1\/?$/, "");

export const socket = io(SOCKET_URL, {
  withCredentials: true,
});
