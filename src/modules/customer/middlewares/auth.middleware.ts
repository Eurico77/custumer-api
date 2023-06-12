import { Injectable, NestMiddleware } from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { Request, Response, NextFunction } from 'express';
import { Client, Issuer, TokenSet } from 'openid-client';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private client: Client;

  constructor() {
    Issuer.discover(process.env.ISSUER_API_URL).then((issuer: Issuer) => {
      this.client = new issuer.Client({
        client_id: process.env.AUTH_CLIENT_ID,
        client_secret: process.env.AUTH_CLIENT_SECRET,
      });
    });
  }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) throw new Error('Authorization token not provided');
      const tokenSet = new TokenSet({ access_token: token });
      await this.validateToken(tokenSet);
      next();
    } catch (error) {
      res
        .status(HttpStatusCode.Unauthorized)
        .json({ message: 'Unauthorized access' });
    }
  }

  private async validateToken(tokenSet: TokenSet): Promise<void> {
    const { client } = this;
    const isValidToken = await client.introspect(tokenSet.access_token);
    if (!isValidToken || !isValidToken.active) {
      throw new Error('Invalid token');
    }
  }
}
