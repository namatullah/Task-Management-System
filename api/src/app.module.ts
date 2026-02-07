import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MembersModule } from './members/members.module';

@Module({
  imports: [PrismaModule, ProjectsModule, AuthModule, UserModule, MembersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
