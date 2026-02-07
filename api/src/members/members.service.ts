import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { connect } from 'http2';
import { isNotIn } from 'class-validator';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  create(createMemberDto: CreateMemberDto) {
    const isAdmin = createMemberDto.isAdmin === 'on';
    return this.prisma.projectUser.create({
      data: {
        projectId: createMemberDto.projectId,
        userId: createMemberDto.userId,
        isAdmin: isAdmin,
      },
    });
  }

  async findAll(projectId: string) {
    const members = await this.prisma.projectUser.findMany({
      where: { projectId },
      orderBy: { isAdmin: 'desc' },
      include: { user: { select: { name: true } } },
    });
    const memberIds = members.map((member) => member.userId);
    const availabelUsers = await this.prisma.user.findMany({
      where: {
        id: { notIn: memberIds.length > 0 ? memberIds : undefined },
        isActive: true,
      },
      select: { id: true, name: true, role: true },
    });
    return { availabelUsers, members };
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
