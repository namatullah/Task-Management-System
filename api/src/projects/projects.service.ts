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
    console.log('all')
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const where = query
      ? {
          OR: [
            { name: { contains: query } },
            { description: { contains: query } },
          ],
        }
      : undefined;
    const projects = await this.prisma.project.findMany({
      where,
      take: ITEMS_PER_PAGE,
      skip,
      orderBy: { createdAt: 'desc' },
    });

    const total = await this.prisma.project.count({ where });

    return { projects, total_page: Math.ceil(total / ITEMS_PER_PAGE) };
  }

  findOne(id: string) {
    return this.prisma.project.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateProjectDto) {
    return this.prisma.project.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.project.delete({ where: { id } });
  }
}
