import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from 'src/common/dto';
import { User } from 'src/entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private async userExists({ email, cpf }: CreateUserDto): Promise<boolean> {
    return await this.usersRepository.exists({ where: [{ email }, { cpf }] });
  }

  async create(user: CreateUserDto): Promise<User | null> {
    if (await this.userExists(user)) {
      return null;
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
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

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ email });
    return user ? user : null;
  }
}
