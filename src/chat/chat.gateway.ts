import { ChatService } from './chat.service';
import { Bind } from '@nestjs/common';

import { Server } from 'http';
import { ChatDto } from './data/data.request';
import {
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
  SubscribeMessage,
} from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements NestGateway {
  constructor() {}

  afterInit(server: Server) {}

  handleConnection(socket: any) {
    const query = socket.handshake.query;
    console.log('Connected', JSON.stringify(query));
    process.nextTick(async () => {});
  }

  handleDisconnect(socket: any) {
    const query = socket.handshake.query;
    console.log('Disconnect', socket.handshake.query);
  }

  @Bind(MessageBody(), ConnectedSocket())
  @SubscribeMessage('chat')
  async handleNewMessage(chat: ChatDto, sender: any) {
    try {
      console.log('New Chat', chat);

      sender.emit('newChat', chat);
      sender.broadcast.emit('newChat', chat);
    } catch (error) {
      console.log(error.response);
    }
  }
}
