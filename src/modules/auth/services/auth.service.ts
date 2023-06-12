import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/login.DTO';
import axios from 'axios';

const SSO_UNAVAILABLE_MESSAGE = 'SSO is unavailable';
const SSO_UNAVAILABLE_STATUS = HttpStatus.BAD_GATEWAY;

@Injectable()
export class AuthService {
  async login({ password, username }: LoginDto): Promise<string> {
    try {
      const passwordEncoded = Buffer.from(password).toString('base64');
      const params = new URLSearchParams();
      params.append('grant_type', process.env.AUTH_GRANT_TYPE);
      params.append('client_id', process.env.AUTH_CLIENT_ID);
      params.append('client_secret', process.env.AUTH_CLIENT_SECRET);
      params.append('username', username);
      params.append('password', passwordEncoded);

      const { data } = await axios.post(
        process.env.AUTH_API_URL,
        params.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return data.access_token;
    } catch (error) {
      return error === 'ECONNREFUSED'
        ? {
            message: SSO_UNAVAILABLE_MESSAGE,
            status: SSO_UNAVAILABLE_STATUS,
          }
        : error;
    }
  }
}
