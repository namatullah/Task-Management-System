import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthController } from 'src/auth/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [UserService],
})
export class UserModule {}
