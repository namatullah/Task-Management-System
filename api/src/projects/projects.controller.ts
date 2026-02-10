import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UpdateStepperDto } from './dto/stepper.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll(
    @Query('query') query = '',
    @Query('page') page = '1',
    @Query('ITEMS_PER_PAGE') ITEMS_PER_PAGE = 10,
  ) {
    return this.projectsService.findAll(query, +page, +ITEMS_PER_PAGE);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return;
    this.projectsService.remove(id);
  }

  @Patch(':id/stepper')
  updateStepper(
    @Param('id') id: string,
    @Body() updateStepperDto: UpdateStepperDto,
  ) {
    return this.projectsService.updateStepper(id, updateStepperDto);
  }

  @Get(':id/stepper')
  getStep(@Param('id') id: string) {
    return this.projectsService.getStep(id);
  }
}
