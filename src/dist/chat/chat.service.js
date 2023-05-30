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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const chat_schema_1 = require("../schema/chat.schema");
const talk_schema_1 = require("../schema/talk.schema");
const attendee_schema_1 = require("../schema/attendee.schema");
let ChatService = class ChatService {
    constructor(chatModel, talkModel, attendeeModel) {
        this.chatModel = chatModel;
        this.talkModel = talkModel;
        this.attendeeModel = attendeeModel;
    }
    async getChats() {
        var _a;
        try {
            return await this.chatModel.find();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, (error === null || error === void 0 ? void 0 : error.status) || ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.statusCode) || 500, {
                cause: error,
            });
        }
    }
    async saveChat(chat) {
        var _a;
        try {
            const findTalk = await this.talkModel
                .findById(chat.talk)
                .populate('attendee');
            if (!findTalk) {
                throw new common_1.BadRequestException('talk not found');
            }
            const findAttendeeDetails = await this.attendeeModel.findById(chat.sender);
            if (!findAttendeeDetails) {
                throw new common_1.BadRequestException('attendee not found');
            }
            const checkIfAttendeeInTalk = findTalk.attendee.find((it) => it.email === findAttendeeDetails.email);
            if (!checkIfAttendeeInTalk) {
                throw new common_1.HttpException('attendee is not added to talk', 400);
            }
            const createdChat = new this.chatModel(chat);
            await createdChat.save();
            const updated = await this.talkModel
                .findByIdAndUpdate(chat.talk, {
                $push: {
                    chat: createdChat,
                },
                new: true,
            })
                .populate({
                path: 'chat',
                populate: {
                    path: 'sender',
                },
            });
            const findChats = updated.chat;
            return findChats;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.statusCode) || 400, {
                cause: error,
            });
        }
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(chat_schema_1.Chat.name)),
    __param(1, (0, mongoose_1.InjectModel)(talk_schema_1.Talk.name)),
    __param(2, (0, mongoose_1.InjectModel)(attendee_schema_1.Attendee.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map