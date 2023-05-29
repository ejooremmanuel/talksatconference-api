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
exports.TalkSchema = exports.Talk = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const talk_status_enum_1 = require("../talk/types/talk-status.enum");
let Talk = class Talk {
};
__decorate([
    (0, mongoose_1.Prop)({
        unique: true,
        required: [true, 'add a title'],
    }),
    __metadata("design:type", String)
], Talk.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: talk_status_enum_1.TalkStatusEnum.Active,
        enum: [talk_status_enum_1.TalkStatusEnum.Active, talk_status_enum_1.TalkStatusEnum.IN_ACTIVE],
    }),
    __metadata("design:type", String)
], Talk.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendee' }] }),
    __metadata("design:type", Array)
], Talk.prototype, "attendee", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }] }),
    __metadata("design:type", Array)
], Talk.prototype, "chat", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: Date.now,
    }),
    __metadata("design:type", Date)
], Talk.prototype, "dateCreated", void 0);
Talk = __decorate([
    (0, mongoose_1.Schema)()
], Talk);
exports.Talk = Talk;
exports.TalkSchema = mongoose_1.SchemaFactory.createForClass(Talk);
//# sourceMappingURL=talk.schema.js.map