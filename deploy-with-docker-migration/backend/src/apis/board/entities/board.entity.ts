import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  number: number;

  @Column()
  @Field(() => String)
  writer: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  contents: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  hobby?: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  apple?: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  apple2?: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  apple3?: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  apple4?: string;
}
