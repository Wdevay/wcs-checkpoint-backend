import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";

@Entity()
@ObjectType()
export class Country extends BaseEntity {
    @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Field()
  @Column({ unique: true })
  code!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  emoji!: string;

  @Field()
  @Column()
  continent!: string;
}

@InputType()
export class CountryInput {
  @Field({ nullable: true })
  code!: string;

  @Field({ nullable: true })
  name!: string;

  @Field({ nullable: true })
  emoji!: string;

  @Field({ nullable: true })
  continent!: string;
}