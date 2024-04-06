import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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
    const user = await this.userService.findOneById(id);
    if (user) {
      return user;
    } else {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('create')
  async createUser(@Body() user: CreateUserDto) {
    const createdUser = await this.userService.create(user);
    if (createdUser) {
      return {
        message: `created user`,
        createdUser,
      };
    } else {
      throw new HttpException('User Already Exists', HttpStatus.CONFLICT);
    }
  }

  @Put('update/:id')
  async updateUser(@Param() { id }: any, @Body() updateUser: UpdateUserDto) {
    const updatedUser = await this.userService.updateById(id, updateUser);
    if (updatedUser.affected != 0) {
      return {
        message: `user ${id} updated`,
      };
    } else {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('delete/:id')
  async deleteUser(@Param() { id }: any) {
    const deletedUser = await this.userService.deleteById(id);
    if (deletedUser.affected != 0) {
      return {
        message: `User ${id} deleted`,
      };
    } else {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
