import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: any) {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    console.log(`Headers:`, req.headers);
    console.log(`Body:`, req.body);
    next();
  }
}