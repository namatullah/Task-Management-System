import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}
  @Post('register')
  async register(
    @Body() body: { emai: string; password: string; name?: string },
  ) {
    const existing = await this.userService.findByEmail(body.emai);
    if (existing)
      throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
    return this.userService.createUser(body.emai, body.password, body.name);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.userService.validateUser(body.email, body.password);
    if (!user)
      throw new HttpException('Invalid Credential', HttpStatus.UNAUTHORIZED);
    return { id: user.id, email: user.email, name: user.name, role: user.role };
  }
}
