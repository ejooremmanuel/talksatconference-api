"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const chat_service_1 = require("./chat.service");
const common_1 = require("@nestjs/common");
const data_request_1 = require("./data/data.request");
const websockets_1 = require("@nestjs/websockets");
let ChatGateway = class ChatGateway {
    constructor(chatService) {
        this.chatService = chatService;
    }
    afterInit(server) { }
    handleConnection(socket) {
        const query = socket.handshake.query;
        console.log('Connected', JSON.stringify(query));
        process.nextTick(async () => {
            socket.emit('allChats', await this.chatService.getChats());
        });
    }
    handleDisconnect(socket) {
        const query = socket.handshake.query;
        console.log('Disconnect', socket.handshake.query);
    }
    async handleNewMessage(chat, sender) {
        try {
            console.log('New Chat', chat);
            await this.chatService.saveChat(chat);
            sender.emit('newChat', chat);
            sender.broadcast.emit('newChat', chat);
        }
        catch (error) {
            console.log(error.response);
        }
    }
    async handleGetChats(chat, sender) {
        try {
            console.log('New event', chat);
            sender.emit('newevent', chat);
            sender.broadcast.emit('newEvent', chat);
        }
        catch (error) {
            console.log(error.response);
        }
    }
};
__decorate([
    (0, common_1.Bind)((0, websockets_1.MessageBody)(), (0, websockets_1.ConnectedSocket)()),
    (0, websockets_1.SubscribeMessage)('chat'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [data_request_1.ChatDto, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleNewMessage", null);
__decorate([
    (0, common_1.Bind)((0, websockets_1.MessageBody)(), (0, websockets_1.ConnectedSocket)()),
    (0, websockets_1.SubscribeMessage)('getChats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [data_request_1.ChatDto, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleGetChats", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map