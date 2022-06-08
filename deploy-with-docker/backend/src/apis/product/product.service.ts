import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from '../productCategory/entities/productCategory.entity';
import { ProductSaleslocation } from '../productSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from '../productTag/entities/productTag.entity';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';

interface IFindOne {
  productId: string;
}

interface ICreate {
  createProductInput: CreateProductInput;
}

interface IUpdate {
  productId: string;
  updateProductInput: UpdateProductInput;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,

    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,

    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,
  ) {}

  async findAll() {
    return await this.productRepository.find({
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  async findOne({ productId }: IFindOne) {
    return await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  async create({ createProductInput }: ICreate) {
    // 1. 상품만 등록하는 경우
    // await this.productRepository.save({
    //   ...createProductInput, // 스프레드연산자 사용하기
    //   // 하나하나 직접 나열하기
    //   // name: createProductInput.name,
    //   // description: createProductInput.description,
    //   // price: createProductInput.price,
    // });
    //
    // 2. 상품과 상품거래위치 테이블을 연결하여 등록하기
    console.log(createProductInput);

    // 2-1. 하나하나 분해하기
    // const product = {
    //   name: createProductInput.name,
    //   description: createProductInput.description,
    //   price: createProductInput.price
    // }
    // const productSaleslocation = createProductInput.productSaleslocation
    //
    // 2-2. 한번에 분해하기
    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput;

    const result1 = await this.productSaleslocationRepository.save({
      ...productSaleslocation,
    });

    const result2 = await this.productCategoryRepository.findOne({
      id: productCategoryId,
    });

    // productTags; // ["#전자제품", "#영등포", "#컴퓨터"]
    // ('#전자제품');

    const result3 = [];
    // 추후 for문을 map과 Promise.all로 최적화 할 것
    for (let i = 0; i < productTags.length; i++) {
      const tagname = productTags[i].replace('#', '');
      const prevTag = await this.productTagRepository.findOne({
        name: tagname,
      });

      // 기존에 태그가 존재한다면
      if (prevTag) {
        result3.push(prevTag);
        //
        // 기존에 태그가 없었다면
      } else {
        const newTag = await this.productTagRepository.save({
          name: tagname,
        });
        result3.push(newTag);
      }
    }

    // 방금 등록한 productTag 포함시켜서 product 등록!!
    return await this.productRepository.save({
      ...product,
      productSaleslocation: result1,
      productCategory: result2, // { id: productCategoryId }와 차이점 비교하기
      productTags: result3,
    });
  }

  async update({ productId, updateProductInput }: IUpdate) {
    const product = await this.productRepository.findOne({ id: productId });
    const { productTags, ...newProduct } = {
      ...product,
      ...updateProductInput,

      // name: updateProductInput.name,
      // description: updateProductInput.description,
      // price: updateProductInput.price
    };

    return await this.productRepository.save(newProduct);
  }

  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({ id: productId });
    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    // throw new HttpException(
    //   '이미 판매 완료된 상품입니다.',
    //   HttpStatus.UNPROCESSABLE_ENTITY,
    // );
  }

  async delete({ productId }) {
    // 1. 진짜 삭제
    // const result = await this.productRepository.delete({ id: productId });
    // return result.affected ? true : false;
    //
    // 2. 소프트 삭제(직접구현) - 1
    // await this.productRepository.update({id: productId}, { isDeleted: true })
    //
    // 3. 소프트 삭제(직접구현) - 2
    // await this.productRepository.update({ id: productId }, { deletedAt: new Date() })
    //
    // 4. 소프트 삭제(TypeORM 제공) - 1
    // await this.productRepository.softRemove({ id: productId }) // id로만 삭제 가능
    //
    // 5. 소프트 삭제(TypeORM 제공) - 2
    const result = await this.productRepository.softDelete({ id: productId }); // 다양한 조건으로 삭제 가능
    return result.affected ? true : false;
  }
}
