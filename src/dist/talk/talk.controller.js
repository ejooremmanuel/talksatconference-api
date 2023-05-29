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
exports.TalkController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const talk_service_1 = require("./talk.service");
const data_request_1 = require("./data/data.request");
let TalkController = class TalkController {
    constructor(talkService) {
        this.talkService = talkService;
    }
    async createTalk(data) {
        common_1.HttpStatus.CREATED;
        return this.talkService.createTalk(data);
    }
    async addAttendeeToTalk(id, data) {
        return this.talkService.addAttendeeToTalk(id, data.attendee);
    }
    async getTalkChats(id) {
        return this.talkService.getTalkChats(id);
    }
    async removeTalk(id) {
        await this.talkService.removeTalk(id);
    }
};
__decorate([
    (0, swagger_1.ApiTags)('Create new talk'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [data_request_1.TalkDto]),
    __metadata("design:returntype", Promise)
], TalkController.prototype, "createTalk", null);
__decorate([
    (0, swagger_1.ApiTags)('Add attendee to a talk'),
    (0, swagger_1.ApiParam)({
        name: 'id',
    }),
    (0, common_1.Put)(':id/attendee'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, data_request_1.TalkDto]),
    __metadata("design:returntype", Promise)
], TalkController.prototype, "addAttendeeToTalk", null);
__decorate([
    (0, swagger_1.ApiTags)('Get all chats for a talk'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TalkController.prototype, "getTalkChats", null);
__decorate([
    (0, swagger_1.ApiTags)('Remove a talk'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TalkController.prototype, "removeTalk", null);
TalkController = __decorate([
    (0, common_1.Controller)('talk'),
    __metadata("design:paramtypes", [talk_service_1.TalkService])
], TalkController);
exports.TalkController = TalkController;
//# sourceMappingURL=talk.controller.js.map