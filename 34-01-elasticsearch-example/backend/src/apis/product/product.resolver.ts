import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  @Query(() => [Product])
  async fetchProducts() {
    // 엘라스틱서치에서 조회하기 연습!!
    const result = await this.elasticsearchService.search({
      index: 'myproduct',
      query: {
        match_all: {},
      },
    });
    console.log(JSON.stringify(result, null, ' '));

    // 엘라스틱서치에서 조회해보기위해 임시로 주석!!
    // return await this.productService.findAll();
  }

  @Query(() => Product)
  async fetchProduct(@Args('productId') productId: string) {
    return await this.productService.findOne({ productId });
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    // 엘라스틱서치에서 등록하기 연습!! => 연습일뿐, 실제로는 MySQL에 저장할 예정!!
    this.elasticsearchService.create({
      id: 'myid',
      index: 'myproduct',
      document: {
        ...createProductInput,
      },
    });

    // 엘라스틱서치에서 등록해보기위해 임시로 주석!!
    // return await this.productService.create({ createProductInput });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    await this.productService.checkSoldout({ productId });

    return await this.productService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('productId') productId: string) {
    return await this.productService.delete({ productId });
  }
}
