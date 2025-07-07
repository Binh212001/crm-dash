import { AbstractEntity } from "@/database/entities/abstract.entity";
import {
  Column,
  Entity,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
  Relation,
  BeforeInsert,
} from "typeorm";
import { v7 } from "uuid";
import { CustomerEntity } from "@/api/customer/entities/customer.entity";
import { UserEntity } from "@/api/user/entities/user.entity";
import { OrderItemEntity } from "./order-item.entity";

export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
  REFUNDED = "refunded",
  PARTIALLY_REFUNDED = "partially_refunded",
}

@Entity("orders")
export class OrderEntity extends AbstractEntity {
  @PrimaryColumn("uuid")
  id: string = v7();

  @Column({ length: 50, unique: true })
  @Index("UQ_order_number")
  orderNumber: string;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  subtotal: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  tax: number;

  @Column({ default: 0 })
  shipping: number;

  @Column({ default: 0 })
  total: number;

  @ManyToOne(() => CustomerEntity, { eager: true })
  @JoinColumn({ name: "customerId" })
  customer?: Relation<CustomerEntity>;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: "userId" })
  user?: Relation<UserEntity>;

  @Column({ nullable: true })
  notes?: string;

  @Column({ nullable: true })
  shippingAddress?: string;

  @Column({ nullable: true })
  billingAddress?: string;

  @Column({ nullable: true })
  trackingNumber?: string;

  @Column({ nullable: true })
  estimatedDelivery?: Date;

  @Column({ nullable: true })
  shippedAt?: Date;

  @Column({ nullable: true })
  deliveredAt?: Date;

  @OneToMany(() => OrderItemEntity, (item) => item.order, { cascade: true })
  items: Relation<OrderItemEntity>[];

  @BeforeInsert()
  generateOrderNumber() {
    if (!this.orderNumber) {
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
      this.orderNumber = `ORD-${timestamp}-${random}`;
    }
    this.total = this.subtotal + this.tax + this.shipping;
  }

  constructor(data?: Partial<OrderEntity>) {
    super();
    Object.assign(this, data);
  }
}
