import { HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { LoginDto } from '../dtos/login.DTO';
import { AuthService } from './auth.service';

jest.mock('axios');

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    const loginDto: LoginDto = {
      username: 'testuser',
      password: 'testpassword',
    };
    const mockAccessToken = 'mocked-access-token';

    it('should return the access token on successful login', async () => {
      const axiosPostSpy = jest.spyOn(axios, 'post').mockResolvedValue({
        data: {
          access_token: mockAccessToken,
        },
      });

      const result = await authService.login(loginDto);

      expect(axiosPostSpy).toHaveBeenCalledTimes(1);
      expect(axiosPostSpy).toHaveBeenCalledWith(
        process.env.AUTH_API_URL,
        expect.any(String),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      expect(result).toEqual(mockAccessToken);
    });

    it('should return an error object when SSO is unavailable', async () => {
      const axiosPostSpy = jest
        .spyOn(axios, 'post')
        .mockRejectedValue('ECONNREFUSED');

      const result = await authService.login(loginDto);

      expect(axiosPostSpy).toHaveBeenCalledTimes(1);
      expect(axiosPostSpy).toHaveBeenCalledWith(
        process.env.AUTH_API_URL,
        expect.any(String),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      expect(result).toEqual({
        message: 'SSO is unavailable',
        status: HttpStatus.BAD_GATEWAY,
      });
    });

    it('should return the error object on other errors', async () => {
      const axiosPostSpy = jest.spyOn(axios, 'post').mockRejectedValue('Error');

      const result = await authService.login(loginDto);

      expect(axiosPostSpy).toHaveBeenCalledTimes(1);
      expect(axiosPostSpy).toHaveBeenCalledWith(
        process.env.AUTH_API_URL,
        expect.any(String),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      expect(result).toEqual('Error');
    });
  });
});
