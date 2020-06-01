import express, {
  Application,
} from 'express';
import { Socket, } from 'socket.io';
import http from 'http';
import { v4 as uuidv4, } from 'uuid';
import { parse, } from 'cookie';
import jsonwebtoken from 'jsonwebtoken';

import Player from './modules/Player/Player';

const APP_PORT: number = 5000;

const app: Application = express();
const server = http.createServer(app);

app.locals.TOKEN_SECRET = uuidv4();
app.locals.gameDictionary = {};

const io = require('socket.io')(server, {
  handlePreflightRequest: (req:any, res:any) => {
    const headers = {
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Origin': req.headers.origin, // or the specific origin you want to give access to,
      'Access-Control-Allow-Credentials': true,
    };
    res.writeHead(200, headers);
    res.end();
  },
});

io.of('/uno').on('connection', (socket: Socket) => {
  console.log(`connected ${socket}`);
  const eventHandlers: any = {
    player: new Player(app, socket),
  };

  Object.keys(eventHandlers).forEach((category) => {
    eventHandlers[category].addListeners();
  });
});

server.listen(APP_PORT, () => {
  console.log(`Server running on port ${APP_PORT}`);
});
