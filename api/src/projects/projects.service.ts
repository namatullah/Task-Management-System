import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateStepperDto } from './dto/stepper.dto';
import { retry } from 'rxjs';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProjectDto) {
    return await this.prisma.project.create({ data });
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
    return await this.prisma.project.findUnique({
      where: { id },
      include: { owner: { select: { name: true } } },
    });
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
    console.log(id);
    console.log(data);
    return this.prisma.$transaction(async (tx) => {
      const activeStatus = await tx.projectStatusHistory.findFirst({
        where: {
          projectId: id,
          status: 'active',
        },
        orderBy: { changedAt: 'desc' },
      });

      // ======================
      // FORWARD
      // ======================
      if (data.isForward) {
        if (activeStatus) {
          await tx.projectStatusHistory.update({
            where: { id: activeStatus.id },
            data: { status: 'done' },
          });
        }

        if (data.isFinal) return activeStatus;

        return tx.projectStatusHistory.create({
          data: {
            projectId: id,
            changedBy: data.userId,
            notes: data.notes,
            status: 'active',
            step: data.status,
          },
        });
      }

      // ======================
      // BACKWARD
      // ======================
      if (!activeStatus) return null;

      await tx.projectStatusHistory.delete({
        where: { id: activeStatus.id },
      });

      const previous = await tx.projectStatusHistory.findFirst({
        where: {
          projectId: id,
          step: data.status,
        },
        orderBy: { changedAt: 'desc' },
      });

      if (!previous) return null;

      return tx.projectStatusHistory.update({
        where: { id: previous.id },
        data: { status: 'active' },
      });
    });
  }

  async getStep(id: string) {
    return await this.prisma.projectStatusHistory.findMany({
      where: { projectId: id },
      orderBy: { changedAt: 'asc' },
    });
  }
}
