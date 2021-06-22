import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      giftCard? : Record<string, any>
    };
  }
}
