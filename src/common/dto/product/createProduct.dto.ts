import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  size: string;

  @IsNotEmpty()
  color: string;

  @IsNumberString()
  price: number;

  @IsNumberString()
  quantity: number;
}
