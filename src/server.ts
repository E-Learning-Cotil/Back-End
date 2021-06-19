require("dotenv").config();    
import express from 'express';
import cors from 'cors';

import socketio from 'socket.io';
import http from 'http';
import path from 'path';

import routes from './routes';
import errors from './errors/errors';
import socketController from './controllers/socketController';

const app = express();

const httpServer = http.createServer(app);
const io = new socketio.Server(httpServer);

app.use(cors());
app.use(express.json());
app.use('/', routes);

app.use('/chat', express.static(path.resolve(__dirname, '..', 'public')));

app.use(errors.notFound);

app.use(errors.handleAll);

io.on("connection", socketController.connection);

httpServer.listen(process.env.PORT, () => console.log("Server is running..."));