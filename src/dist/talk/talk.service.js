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
exports.TalkService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const attendee_schema_1 = require("../schema/attendee.schema");
const talk_schema_1 = require("../schema/talk.schema");
const data_response_1 = require("./data/data.response");
const talk_status_enum_1 = require("./types/talk-status.enum");
let TalkService = class TalkService {
    constructor(talkModel, attendeeModel) {
        this.talkModel = talkModel;
        this.attendeeModel = attendeeModel;
    }
    async createTalk(data) {
        var _a;
        try {
            const createdTalk = await this.talkModel.create({
                title: data.title,
            });
            return data_response_1.TalkResponse.from(createdTalk);
        }
        catch (error) {
            throw new common_1.HttpException(error === null || error === void 0 ? void 0 : error.message, (error === null || error === void 0 ? void 0 : error.status) || ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.statusCode) || 400, {
                cause: error,
            });
        }
    }
    async addAttendeeToTalk(talkId, attendeeId) {
        var _a;
        try {
            if (!talkId || !attendeeId) {
                throw new common_1.BadRequestException('no id');
            }
            const foundTalk = await this.talkModel
                .findById(talkId)
                .populate('attendee');
            if (!foundTalk || foundTalk.status === talk_status_enum_1.TalkStatusEnum.IN_ACTIVE) {
                throw new common_1.NotFoundException('talk not found');
            }
            const foundAttendee = await this.attendeeModel.findById(attendeeId);
            if (!foundAttendee) {
                throw new common_1.NotFoundException('attendee not found');
            }
            const findAttendeeInTalk = foundTalk.attendee.find((it) => it.email === foundAttendee.email);
            if (findAttendeeInTalk) {
                throw new common_1.BadRequestException('attendee already added to talk');
            }
            const updatedTalkWithNewAttendee = await this.talkModel.findByIdAndUpdate(talkId, {
                $push: {
                    attendee: attendeeId,
                },
            }, {
                new: true,
            });
            return data_response_1.TalkResponse.from(updatedTalkWithNewAttendee);
        }
        catch (error) {
            throw new common_1.HttpException(error === null || error === void 0 ? void 0 : error.message, (error === null || error === void 0 ? void 0 : error.status) || ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.statusCode) || 400, {
                cause: error,
            });
        }
    }
    async removeTalk(talkId) {
        var _a;
        try {
            const findTalk = await this.talkModel
                .findById(talkId)
                .populate('chat attendee');
            if (findTalk &&
                (findTalk.attendee.length > 1 || findTalk.chat.length > 0)) {
                await this.talkModel.findByIdAndUpdate(talkId, {
                    $set: {
                        status: talk_status_enum_1.TalkStatusEnum.IN_ACTIVE,
                    },
                });
            }
            await this.talkModel.findByIdAndDelete(talkId);
        }
        catch (error) {
            throw new common_1.HttpException(error === null || error === void 0 ? void 0 : error.message, (error === null || error === void 0 ? void 0 : error.status) || ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.statusCode) || 400, {
                cause: error,
            });
        }
    }
    async getTalkChats(talkId) {
        var _a;
        try {
            const foundTalk = await this.talkModel
                .findById(talkId)
                .populate({
                path: 'chat',
                populate: {
                    path: 'sender',
                },
            })
                .populate('attendee');
            if (!foundTalk || foundTalk.status === talk_status_enum_1.TalkStatusEnum.IN_ACTIVE) {
                throw new common_1.NotFoundException('talk not found');
            }
            return data_response_1.TalkResponse.from(foundTalk);
        }
        catch (error) {
            throw new common_1.HttpException(error === null || error === void 0 ? void 0 : error.message, (error === null || error === void 0 ? void 0 : error.status) || ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.statusCode) || 400, {
                cause: error,
            });
        }
    }
    async getTalks() {
        var _a;
        try {
            const foundTalk = await this.talkModel
                .find()
                .populate({
                path: 'chat',
                populate: {
                    path: 'sender',
                },
            })
                .populate('attendee');
            const data = [];
            for (let item of foundTalk) {
                const res = data_response_1.TalkResponse.from(item);
                data.push(res);
            }
            return data;
        }
        catch (error) {
            throw new common_1.HttpException(error === null || error === void 0 ? void 0 : error.message, (error === null || error === void 0 ? void 0 : error.status) || ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.statusCode) || 500, {
                cause: error,
            });
        }
    }
};
TalkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(talk_schema_1.Talk.name)),
    __param(1, (0, mongoose_1.InjectModel)(attendee_schema_1.Attendee.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], TalkService);
exports.TalkService = TalkService;
//# sourceMappingURL=talk.service.js.map