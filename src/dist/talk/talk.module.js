"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TalkModule = void 0;
const common_1 = require("@nestjs/common");
const talk_controller_1 = require("./talk.controller");
const talk_service_1 = require("./talk.service");
const mongoose_1 = require("@nestjs/mongoose");
const attendee_schema_1 = require("../schema/attendee.schema");
const talk_schema_1 = require("../schema/talk.schema");
let TalkModule = class TalkModule {
};
TalkModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: talk_schema_1.Talk.name, schema: talk_schema_1.TalkSchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: attendee_schema_1.Attendee.name, schema: attendee_schema_1.AttendeeSchema },
            ]),
        ],
        controllers: [talk_controller_1.TalkController],
        providers: [talk_service_1.TalkService],
    })
], TalkModule);
exports.TalkModule = TalkModule;
//# sourceMappingURL=talk.module.js.map