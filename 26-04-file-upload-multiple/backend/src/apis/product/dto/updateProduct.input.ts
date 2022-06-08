import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './createProduct.input';

@InputType()
export class UpdateProductInput extends PartialType(
  OmitType(CreateProductInput, ['productCategoryId']),
) {}
