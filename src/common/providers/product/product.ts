import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, UpdateProductDto } from 'src/common/dto';
import { Product } from 'src/entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(product: CreateProductDto) {
    return await this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOneById(id: number) {
    return await this.productRepository.findOneBy({ id });
  }

  async updateById(id: number, product: UpdateProductDto) {
    return await this.productRepository.update({ id }, product);
  }

  async deleteById(id: number) {
    return await this.productRepository.delete({ id });
  }
}
