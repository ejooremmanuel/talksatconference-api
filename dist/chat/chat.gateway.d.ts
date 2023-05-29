/// <reference types="node" />
import { ChatService } from './chat.service';
import { Server } from 'http';
import { ChatDto } from './data/data.request';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
export declare class ChatGateway implements NestGateway {
    private chatService;
    constructor(chatService: ChatService);
    afterInit(server: Server): void;
    handleConnection(socket: any): void;
    handleDisconnect(socket: any): void;
    handleNewMessage(chat: ChatDto, sender: any): Promise<void>;
    handleGetChats(chat: ChatDto, sender: any): Promise<void>;
}
