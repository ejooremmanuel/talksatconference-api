"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorServerResponse = exports.TransformInterceptor = exports.ServerResponse = void 0;
const common_1 = require("@nestjs/common");
class ServerResponse {
}
exports.ServerResponse = ServerResponse;
let TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        return;
    }
};
TransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);
exports.TransformInterceptor = TransformInterceptor;
class ErrorServerResponse extends Error {
    constructor({ message, status }) {
        super(message);
        console.log(this.name, 'class');
        console.log(this.stack, 'stack');
    }
}
exports.ErrorServerResponse = ErrorServerResponse;
//# sourceMappingURL=ServerResponse.js.map