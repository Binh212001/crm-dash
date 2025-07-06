import { AbstractEntity } from "@/database/entities/abstract.entity";
import {
  Column,
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  Relation,
} from "typeorm";
import { v7 } from "uuid";
import { OrderEntity } from "./order.entity";
import { ProductEntity } from "@/api/product/entities/product.entity";

@Entity("order_items")
export class OrderItemEntity extends AbstractEntity {
  @PrimaryColumn("uuid")
  id: string = v7();

  @ManyToOne(() => OrderEntity, (order) => order.items)
  @JoinColumn({ name: "orderId" })
  order: Relation<OrderEntity>;

  @ManyToOne(() => ProductEntity, { eager: true })
  @JoinColumn()
  product?: Relation<ProductEntity>;

  @Column({ type: "int" })
  quantity: number;

  constructor(data?: Partial<OrderItemEntity>) {
    super();
    Object.assign(this, data);
  }
}
