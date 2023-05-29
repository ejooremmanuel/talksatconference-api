import {
  ArgumentsHost,
  CallHandler,
  Catch,
  ConflictException,
  ExceptionFilter,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Observable, map } from 'rxjs';

export class ServerResponse<T> {
  data?: T;
  error?: Error;
  status: number;
  success: boolean;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ServerResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ServerResponse<T>> {
    return;
    // return next.handle().pipe(map((data) => ({ data, success, status })));
  }
}

export class ErrorServerResponse extends Error {
  constructor({ message, status }) {
    super(message);

    console.log(this.name, 'class');
    console.log(this.stack, 'stack');
  }
}
