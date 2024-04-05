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
import { CreateProductDto, UpdateProductDto } from 'src/common/dto';
import { ProductService } from 'src/common/providers';

@Controller('product')
export class ProductController {
  constructor(
    @Inject(ProductService)
    private productService: ProductService,
  ) {}

  @Get()
  async getAllProducts() {
    return await this.productService.findAll();
  }

  @Get(':id')
  async getProductById(@Param() { id }: any) {
    return await this.productService.findOneById(id);
  }

  @Post('create')
  async createProduct(@Body() product: CreateProductDto) {
    const createdProduct = await this.productService.create(product);
    return {
      message: `created product`,
      createdProduct,
    };
  }

  @Put('update/:id')
  async updateProduct(
    @Param() { id }: any,
    @Body() updateProduct: UpdateProductDto,
  ) {
    await this.productService.updateById(id, updateProduct);
    return {
      message: `product ${id} updated`,
    };
  }

  @Delete('delete/:id')
  async deleteProduct(@Param() { id }: any) {
    await this.productService.deleteById(id);
    return {
      message: `product ${id} deleted`,
    };
  }
}
