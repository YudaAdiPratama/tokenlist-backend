// src/middleware/keyToken.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class KeyTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const expectedKeyToken = process.env.KEY_TOKEN;
    const keyToken = req.headers['key-token']; // Adjust the header name as needed

    if (keyToken !== expectedKeyToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
  }
}
