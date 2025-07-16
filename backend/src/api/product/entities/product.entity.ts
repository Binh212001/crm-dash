import { AbstractEntity } from "@/database/entities/abstract.entity";
import {
  Column,
  Entity,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Relation,
} from "typeorm";
import { v7 } from "uuid";
import { CategoryEntity } from "./category.entity";
import { TagEntity } from "@/api/tag/entities/tag.entity";

@Entity("products")
export class ProductEntity extends AbstractEntity {
  @PrimaryColumn("uuid")
  id: string = v7();
  @Column()
  sku: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  categoryId?: string;

  @ManyToOne(() => CategoryEntity, { nullable: true })
  @JoinColumn({ name: "categoryId" })
  category?: CategoryEntity;

  @Column({ nullable: true })
  vendor?: string;

  @Column({ nullable: true })
  collection?: string;
  @Column({ default: 0 })
  price?: string;

  @ManyToMany(() => TagEntity, (tag) => tag.products, { eager: true })
  @JoinTable({
    name: "product_tags",
    joinColumn: { name: "productId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "tagId", referencedColumnName: "id" },
  })
  tags?: Relation<TagEntity>[];

  @Column({ nullable: true })
  image?: string;

  constructor(data?: Partial<ProductEntity>) {
    super();
    Object.assign(this, data);
  }
}
