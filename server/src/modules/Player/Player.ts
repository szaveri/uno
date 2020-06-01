import { Application, } from 'express';
import { Socket, Packet, } from 'socket.io';
import { v4 as uuidv4, } from 'uuid';
import { parse, } from 'cookie';

import jsonwebtoken from 'jsonwebtoken';

export default class Player {
  app: Application;

  socket: Socket;

  constructor(app:Application, socket: Socket) {
    this.app = app;
    this.socket = socket;
  }

  handler: {
    [key: string]: (...args: any[]) => void;
  } = {
    createGame: this.createGame.bind(this),
    joinGame: this.joinGame.bind(this),
    message: this.message.bind(this),
    disconnect: this.disconnect.bind(this),
    unauthorized: this.unauthorized.bind(this),
  }

  addListeners() {
    Object.keys(this.handler).forEach((event: string) => {
      this.socket.on(event, this.handler[event]);
    });

    this.socket.use((packet: Packet, next: any) => {
      if (packet[0] !== 'createGame' && packet[0] !== 'joinGame') {
        if (this.socket.handshake.headers.cookie) {
          const cookies = parse(this.socket.handshake.headers.cookie);
          try {
            jsonwebtoken.verify(cookies.token, this.app.locals.TOKEN_SECRET);
            next();
          } catch (err) {
            this.unauthorized({ message: 'Invalid token', });
          }
        } else {
          this.unauthorized({ message: 'Failed to get token', });
        }
      } else {
        next();
      }
    });
  }

  createGame(data: any) {
    const gameId = uuidv4();
    const token = this.createToken(data.name);

    this.app.locals.gameDictionary[data.gameId] = {
      gameName: data.gameName,
      gamePassword: data.gamePassword ? data.gamePassword : '',
      adminId: token,
      maxPlayers: data.maxPlayers,
      players: [
        token,
      ],
    };

    this.socket.join(gameId);
    this.socket.emit('authenticate', {
      token,
      gameId,
    });

    this.message(gameId, `Player ${data.name} has joined the game`);
  }

  joinGame(data: any) {
    // TODO: Add check that data.gameId is a valid ID
    const gameDetails = this.app.locals.gameDictionary[data.gameId];
    if (gameDetails.roomSize < gameDetails.players.length + 1) {
      this.socket.emit('joinFailed', {
        message: 'Game is full',
      });
      return;
    }

    const token = this.createToken(data.name, data.gameId);
    this.socket.join(data.gameId);
    this.app.locals.gameDictionary[data.gameId].players.push(token);
    this.socket.emit('authenticate', {
      token,
      gameId: data.gameId,
    });
  }

  message(gameId: string, text: string) {
    this.socket.to(gameId).emit('message', { message: text, });
  }

  disconnect() {
    this.socket.leaveAll();
  }

  unauthorized(message: any) {
    this.socket.emit('message', message);
    this.socket.disconnect(true);
  }

  private getPlayerData(): any {
    if (this.socket.handshake.headers.cookie) {
      const cookies = parse(this.socket.handshake.headers.cookie);
      const tokenData = jsonwebtoken.decode(cookies.token, this.app.locals.TOKEN_SECRET);
      if (tokenData) {
        return tokenData;
      }
    }

    return null;
  }

  private createToken(name: string, game?: string): string {
    const gameId = game || uuidv4();
    const isAdmin = !game;

    return jsonwebtoken.sign({
      name,
      isAdmin,
      gameId,
    },
    this.app.locals.TOKEN_SECRET);
  }
}

interface PlayerData {
  name: string;
  gameId: string;
}
