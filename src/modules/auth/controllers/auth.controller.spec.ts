import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.DTO';

describe('AuthController (E2E)', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    app = moduleFixture.createNestApplication();
    authService = moduleFixture.get<AuthService>(AuthService);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /auth/login', () => {
    const mockAccessToken = 'mocked-access-token';
    const loginDto: LoginDto = {
      username: 'testuser',
      password: 'testpassword',
    };

    it('should return the access token on successful login', async () => {
      jest.spyOn(authService, 'login').mockResolvedValue(mockAccessToken);

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual({ access_token: mockAccessToken });
    });

    it('should return an error response when login fails', async () => {
      jest.spyOn(authService, 'login').mockRejectedValue('Login failed');

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR);

      expect(response.body).toEqual({
        message: 'Internal server error',
        statusCode: 500,
      });
    });
  });
});
