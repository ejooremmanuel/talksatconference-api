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
exports.AttendeeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const attendee_schema_1 = require("../schema/attendee.schema");
const data_response_1 = require("./data/data.response");
let AttendeeService = class AttendeeService {
    constructor(attendeeModel) {
        this.attendeeModel = attendeeModel;
    }
    async createAttendee(data) {
        var _a;
        try {
            const createdAttendee = await this.attendeeModel.create(data);
            return data_response_1.AttendeeResponse.from(createdAttendee);
        }
        catch (error) {
            throw new common_1.HttpException(error === null || error === void 0 ? void 0 : error.message, (error === null || error === void 0 ? void 0 : error.status) || ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.statusCode) || 400, {
                cause: error,
            });
        }
    }
};
AttendeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(attendee_schema_1.Attendee.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AttendeeService);
exports.AttendeeService = AttendeeService;
//# sourceMappingURL=attendee.service.js.map