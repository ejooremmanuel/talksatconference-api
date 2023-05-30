import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class ServerResponse<T> {
    data?: T;
    error?: Error;
    status: number;
    success: boolean;
}
export declare class TransformInterceptor<T> implements NestInterceptor<T, ServerResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ServerResponse<T>>;
}
export declare class ErrorServerResponse extends Error {
    constructor({ message, status }: {
        message: any;
        status: any;
    });
}
