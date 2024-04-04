import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/common/dto';
import { UserService } from 'src/common/providers';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService)
    private userService: UserService,
  ) {}

  @Get(':id')
  async getUserById(@Param() { id }: any) {
    return await this.userService.findOneById(id);
  }

  @Post('create')
  async createUser(@Body() user: CreateUserDto) {
    const createdUser = await this.userService.create(user);
    return {
      message: `created user`,
      createdUser,
    };
  }

  @Put('update/:id')
  async updateUser(@Param() { id }: any, @Body() updateUser: UpdateUserDto) {
    await this.userService.updateById(id, updateUser);
    return {
      message: `user ${id} updated`,
    };
  }

  @Delete('delete/:id')
  async deleteUser(@Param() { id }: any) {
    await this.userService.deleteById(id);
    return {
      message: `User ${id} deleted`,
    };
  }
}
