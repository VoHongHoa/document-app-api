import { Controller, Post, Body, Get, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dtos';
import { SignUpReponse, SignInReponse } from './reponse';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { UserFromGoogle } from './interface';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { GoogleGuard } from './guards';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private config: ConfigService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin(): void {
    // This route will redirect the user to the Google OAuth login page
  }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  async googleLoginCallback(
    @GetUser() user: UserFromGoogle,
    @Res() res: Response,
  ) {
    const token = await this.authService.signinWithGoogle(user);
    // Handle user data and redirect as needed
    return res.redirect(
      `${this.config.get('REACT_APP_URL')}/google-auth?access_token=${token}`,
    ); // Redirect to frontend after successful login
  }

  @Post('signup')
  async signup(@Body() dto: SignUpDto): Promise<SignUpReponse> {
    return this.authService.signup(dto);
  }

  @Post('signin')
  async signin(@Body() dto: SignInDto): Promise<SignInReponse> {
    return this.authService.signin(dto);
  }
}
