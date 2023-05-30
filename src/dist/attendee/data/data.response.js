"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendeeResponse = void 0;
class AttendeeResponse {
    static from(data) {
        return {
            id: data._id,
            name: data.name,
            emailAddress: data.email,
        };
    }
}
exports.AttendeeResponse = AttendeeResponse;
//# sourceMappingURL=data.response.js.map