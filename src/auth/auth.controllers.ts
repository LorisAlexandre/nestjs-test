import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dto/SignupDto';
import { AuthService } from './auth.services';
import { SigninDto } from './dto/SigninDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('connection')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }
}
