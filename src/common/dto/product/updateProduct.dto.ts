import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './createProduct.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  name?: string;
  price?: number;
  quantity?: number;
}
