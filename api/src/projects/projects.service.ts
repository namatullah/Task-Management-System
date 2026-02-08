import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateStepperDto } from './dto/stepper.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProjectDto) {
    const project = await this.prisma.project.create({ data });

    await this.prisma.projectStatusHistory.create({
      data: {
        projectId: project.id,
        changedBy: data.ownerId,
        notes: '',
        status: 'active',
        step: 'Planned',
      },
    });

    return project;
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

  async updateStepper(id: string, data: UpdateStepperDto) {
    await this.prisma.project.update({
      where: { id },
      data: { status: data.status },
    });

    const activeStatus = await this.prisma.projectStatusHistory.findFirst({
      where: { projectId: id, status: 'active' },
    });
    if (activeStatus) {
      await this.prisma.projectStatusHistory.update({
        where: { id: activeStatus.id },
        data: { status: 'done' },
      });
    }
    if (!['Complete', 'Canceled'].includes(data.status)) {
      const projectStatus = await this.prisma.projectStatusHistory.create({
        data: {
          projectId: id,
          changedBy: data.userId,
          notes: data.notes,
          status: 'active',
          step: data.status,
        },
      });

      return projectStatus;
    } else {
      return activeStatus;
    }
  }

  async getStep(id: string) {
    return await this.prisma.projectStatusHistory.findMany({
      where: { projectId: id },
    });
  }
}
