import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from 'src/common/dto';
import { User } from 'src/entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User | null> {
    return await this.usersRepository.save(user);
  }

  async findOneById(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async updateById(id: number, user: UpdateUserDto) {
    return await this.usersRepository.update({ id }, user);
  }

  async deleteById(id: number) {
    return await this.usersRepository.delete({ id });
  }
}
