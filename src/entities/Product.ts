import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: "float" })
  price!: number;

  @Column()
  creatorId!: number;

  //User entity, which column in  user table
  @ManyToOne(() => User, (user) => user.products)
  //typeorm will make relation column as Id
  creator: User; //eventually, creatorId

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
