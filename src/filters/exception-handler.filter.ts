import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Request, Response } from 'express';

@Catch()
export class ExceptionHandlerFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    console.log(exception);

    const requestTime = new Date().toISOString();

    if (exception instanceof ValidationError) {
      console.log(exception, 'exception');
      return response.status(404).json({
        message: 'validation',
        requestTime,
        url: request.url,
        errorName: 'validation',
        statusCode: 404,
      });
    }

    if (exception instanceof HttpException) {
      return response.status(exception.getStatus()).json({
        message: exception.message,
        requestTime,
        url: request.url,
        errorName: exception.name,
        statusCode: exception.getStatus(),
      });
    } else {
      return response.status(500).json({
        message: exception?.message || 'Internal server error',
        requestTime,
        url: request.url,
        errorName: exception?.name,
        statusCode: 500,
      });
    }
  }
}
