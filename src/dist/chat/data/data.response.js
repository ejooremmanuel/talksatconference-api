"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatResponse = void 0;
class ChatResponse {
    static from(data, talk) {
        return {
            id: data._id,
            talk,
            message: data.message,
            sender: data.sender,
        };
    }
}
exports.ChatResponse = ChatResponse;
//# sourceMappingURL=data.response.js.map