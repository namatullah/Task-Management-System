import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(email: string, password: string, name?: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: { email, password: hashedPassword, name },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credential');

    return user;
  }
}
