"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TalkResponse = void 0;
class TalkResponse {
    static from(data) {
        return {
            id: data._id,
            attendees: data.attendee,
            chats: data.chat,
            title: data.title,
        };
    }
}
exports.TalkResponse = TalkResponse;
//# sourceMappingURL=data.response.js.map