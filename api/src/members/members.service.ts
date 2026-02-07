import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto, UpdateMemberDto } from './dto/member.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async update(id: string, updateMemberDto: UpdateMemberDto) {
    return await this.prisma.projectUser.update({
      where: { id },
      data: { isAdmin: updateMemberDto.isAdmin === 'on' },
    });
  }

  async changeStatus(id: string) {
    const projectUser = await this.prisma.projectUser.findUnique({
      where: { id },
    });
    if (!projectUser) throw new NotFoundException('Data not found');
    return await this.prisma.projectUser.update({
      where: { id },
      data: { isActive: !projectUser.isActive },
    });
  }

  async remove(id: string) {
    return await this.prisma.projectUser.delete({ where: { id } });
  }
}
