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
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/common/dto';
import { JwtGuard } from 'src/common/guards';
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
    const product = await this.productService.findOneById(id);
    if (product) {
      return product;
    } else {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Post('create')
  async createProduct(@Body() product: CreateProductDto) {
    const createdProduct = await this.productService.create(product);
    return {
      message: `created product`,
      createdProduct,
    };
  }

  @UseGuards(JwtGuard)
  @Put('update/:id')
  async updateProduct(
    @Param() { id }: any,
    @Body() updateProduct: UpdateProductDto,
  ) {
    const updatedProduct = await this.productService.updateById(
      id,
      updateProduct,
    );
    if (updatedProduct.affected != 0) {
      return {
        message: `product ${id} updated`,
      };
    } else {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  async deleteProduct(@Param() { id }: any) {
    const deletedProduct = await this.productService.deleteById(id);
    if (deletedProduct.affected != 0) {
      return {
        message: `product ${id} deleted`,
      };
    } else {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
