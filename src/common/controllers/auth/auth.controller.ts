import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginDto } from 'src/common/dto';
import { AuthService } from 'src/common/providers';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    const accessToken = await this.authService.authenticate(loginDto);
    if (accessToken) {
      response.setHeader('Authorization', `Bearer ${accessToken}`);
    }
    response.send();
  }
}
