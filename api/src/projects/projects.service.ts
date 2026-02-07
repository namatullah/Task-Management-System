import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { contains } from 'class-validator';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: CreateProjectDto) {
    return this.prisma.project.create({ data });
  }

  async findAll(query: string, page: number, ITEMS_PER_PAGE: number) {
    console.log('all');
    const where = query
      ? {
          OR: [
            { name: { contains: query } },
            { description: { contains: query } },
          ],
        }
      : undefined;
    const total = await this.prisma.project.count({ where });
    const total_page = Math.ceil(total / ITEMS_PER_PAGE);

    const skip = (page - 1) * ITEMS_PER_PAGE;
    const projects = await this.prisma.project.findMany({
      where,
      take: ITEMS_PER_PAGE,
      skip,
      orderBy: { createdAt: 'desc' },
    });
    return { projects, total_page };
  }

  async findOne(id: string) {
    return await this.prisma.project.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateProjectDto) {
    return await this.prisma.project.update({ where: { id }, data });
  }

  async remove(id: string) {
    return await this.prisma.project.delete({ where: { id } });
  }

  async getMembers() {
    return await this.prisma.project.findMany();
  }
}
