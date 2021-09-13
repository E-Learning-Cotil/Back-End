import dotenv from 'dotenv';
dotenv.config();  

import app from './app';
import socketio from 'socket.io';
import http from 'http';

import socketController from './controllers/socketController';

const httpServer = http.createServer(app);
const io = new socketio.Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
});

io.on("connection", socketController.connection);

httpServer.listen(process.env.PORT, () => console.log("Server is running..."));