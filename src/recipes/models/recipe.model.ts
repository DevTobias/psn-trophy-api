import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@ObjectType({ description: 'recipe' })
@Entity()
export class Recipe {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Directive('@upper')
  @Column('varchar', { length: 30, nullable: false })
  title: string;

  @Field({ nullable: true })
  @Column('varchar', { length: 255, nullable: true })
  description?: string;

  @Field(() => [String])
  @Column('text', { nullable: false, array: true })
  ingredients: string[];

  @Field()
  @Column()
  @CreateDateColumn()
  creationDate: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedDate: Date;

  constructor(partial: Partial<Recipe>) {
    Object.assign(this, partial);
  }
}
