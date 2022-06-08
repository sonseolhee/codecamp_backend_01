import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/productCategory.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async create({ name }) {
    // 카테고리를 데이터베이스에 저장
    return await this.productCategoryRepository.save({ name });
  }

  async delete({ productCategoryId }) {
    return await this.productCategoryRepository.delete({
      id: productCategoryId,
    });
  }
}
