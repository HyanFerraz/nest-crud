import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNumberString()
  cpf: string;
}
