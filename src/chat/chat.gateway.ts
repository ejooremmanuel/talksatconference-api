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
  constructor(private chatService: ChatService) {}

  afterInit(server: Server) {}

  handleConnection(socket: any) {
    const query = socket.handshake.query;
    console.log('Connected', JSON.stringify(query));
    process.nextTick(async () => {
      socket.emit('allChats', await this.chatService.getChats());
    });
  }

  handleDisconnect(socket: any) {
    const query = socket.handshake.query;
    console.log('Disconnect', socket.handshake.query);
  }

  @Bind(MessageBody(), ConnectedSocket())
  @SubscribeMessage('chat')
  async handleNewMessage(chat: ChatDto, sender: any) {
    try {
      const res = await this.chatService.saveChat(chat);
      sender.emit('newChat', [...res]);
      sender.broadcast.emit('newChat', res);
    } catch (error) {
      sender.emit('error-event', error.response);
      sender.broadcast.emit('error-event', error.response);
    }
  }
}
