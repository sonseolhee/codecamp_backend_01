import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  // @Field(() => String) 비밀번호 노출 금지
  password: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Int)
  age: number;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  school: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  hobby: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  apple: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  banana: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  qqq: string;

  @Column({ default: 0 })
  @Field(() => Int)
  point: number;
}
