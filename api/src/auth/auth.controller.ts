import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthService } from './auth.service';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signup(
    @Body() createAuthDto: CreateAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(createAuthDto);
    const existing = await this.userService.findByEmail(createAuthDto.email);
    if (existing) throw new BadRequestException('Email already registered');
    const plainPassword = createAuthDto.password;
    await this.userService.createUser(createAuthDto);
    const { token, user } = await this.authService.signIn(
      createAuthDto.email,
      plainPassword,
    );

    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'lax', // use 'lax' for CSRF protection
      secure: process.env.NODE_ENV === 'production', //set to true in production
      maxAge: 1000 * 60 * 60,
    });

    // return { user };
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, user } = await this.authService.signIn(
      body.email,
      body.password,
    );
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60,
    });
    return { user };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return { ok: true };
  }
}
