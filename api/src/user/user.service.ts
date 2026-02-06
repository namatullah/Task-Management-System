import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { log } from 'console';
import { Role, SignUpDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(signUpDto: SignUpDto) {
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
    signUpDto.password = hashedPassword;
    return this.prisma.user.create({
      data: signUpDto,
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

  async validatePassword(user: any, plain: string) {
    return bcrypt.compare(plain, user.password);
  }

  async findAll(query: string, page: number, ITEMS_PER_PAGE: number) {
    const where = query
      ? {
          OR: [
            { name: { contains: query } },
            { email: { contains: query } },
            { role: { contains: query } },
          ],
        }
      : undefined;
    const total = await this.prisma.user.count({ where });

    const skip = (page - 1) * ITEMS_PER_PAGE;
    const users = await this.prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
      take: ITEMS_PER_PAGE,
      skip,
      orderBy: { createdAt: 'desc' },
    });
    return { users, total_users: total };
  }

  async changeRole(id: string, role: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.prisma.user.update({ where: { id }, data: { role } });
  }

  async changeStatus(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.prisma.user.update({
      where: { id },
      data: { isActive: !user.isActive },
    });
  }
}
