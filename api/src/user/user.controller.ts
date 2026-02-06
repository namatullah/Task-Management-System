import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
// import { UsersService } from './users.service';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  findAll(
    @Query('query') query = '',
    @Query('page') page = '1',
    @Query('ITEMS_PER_PAGE') ITEMS_PER_PAGE = 10,
  ) {
    return this.usersService.findAll(query, +page, +ITEMS_PER_PAGE);
  }

  //   @Patch(':id/edit')
  //   updateUser(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //     return this.usersService.updateUser(id, updateAuthDto);
  //   }

  //   @Patch(':id/status')
  //   changeStatus(@Param('id') id: string) {
  //     return this.usersService.changeStatus(id);
  //   }

  //   @Patch(':id/role')
  //   changeRole(@Param('id') id: string, @Body('role') role: Role) {
  //     return this.usersService.changeRole(id, role);
  //   }

  //   @Patch(':id/changePassword')
  //   changePassword(@Param('id') id: string, @Body('password') password: string) {
  //     return this.usersService.changePassword(id, password);
  //   }
}
