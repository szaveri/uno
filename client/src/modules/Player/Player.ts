import socket from 'socket.io-client';
import Cookies from 'universal-cookie';

let clientSocket: SocketIOClient.Socket;
let cookies: Cookies;

export function getSocket(): SocketIOClient.Socket {
  return clientSocket;
}

export function getCookies(): Cookies {
  return cookies;
}

export function createGame(data: any) {
  console.log(`Requesting to create a game ${data}`);
  clientSocket.emit('createGame', data);
}

export function joinGame(data: any) {
  console.log(`Requesting to join a game ${data}`);
  clientSocket.emit('joinGame', data);
}

export default class Player {
  constructor() {
    cookies = new Cookies();
    clientSocket = socket('http://localhost:5000/uno');
  }

  addListeners() {
    clientSocket.on('authenticate', (data: any) => {
      console.log(`Setting token ${data.token} and game ${data.gameId}`);
      cookies.set('token', data.token, { path: '/' });
      cookies.set('gameId', data.gameId);
    });

    clientSocket.on('unauthorized', (error: any) => {
      if (cookies.get('token')) {
        cookies.remove('token');
      }
      console.log('Unauthorized use of token');
    });
  }
}