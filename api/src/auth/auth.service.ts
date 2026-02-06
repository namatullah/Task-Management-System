import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    console.log('signup', signUpDto);
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
    const role =
      signUpDto.adminToken === process.env.ADMIN_TOKEN ? 'ADMIN' : 'USER';

    const user = await this.prisma.user.create({
      data: {
        email: signUpDto.email,
        password: hashedPassword,
        name: signUpDto.name,
        role,
      },
    });
    const { password, ...result } = user;
    return result;
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: signInDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid Credential');
    }

    const passwordValid = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid Credential');
    }
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async validateUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true },
    });
  }
}
