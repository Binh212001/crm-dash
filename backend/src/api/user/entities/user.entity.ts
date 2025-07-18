import { AbstractEntity } from "@/database/entities/abstract.entity";
import { hashPassword } from "@/utils/password.util";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from "typeorm";
import { v7 } from "uuid";
import { RoleEntity } from "../../permissions/entities/role.entity";

@Entity("users")
export class UserEntity extends AbstractEntity {
  @PrimaryColumn("uuid", { primaryKeyConstraintName: "PK_user_id" })
  id: string;
  @Column({
    length: 50,
    nullable: true,
  })
  @Column({
    length: 100,
    default: "",
  })
  name: string;
  @Column()
  @Index("UQ_user_email", { where: '"deleted_at" IS NULL', unique: true })
  email!: string;

  @Column({ default: "" })
  phoneNumber?: string;
  @Column({ default: "", nullable: true })
  address?: string;

  @Column({ nullable: true })
  dateOfBirth?: Date;

  @Column({ nullable: true })
  password!: string;
  @Column({ default: "" })
  bio?: string;
  @Column({ nullable: true })
  avatar?: string;
  @Column({ default: 0 })
  numberOfCourse: number;
  @Column({
    type: "boolean",
    nullable: false,
    default: false,
  })
  isSuperUser: boolean;

  @ManyToOne(() => RoleEntity, (role) => role.users, {
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  role: Relation<RoleEntity>;

  @DeleteDateColumn({
    type: "timestamptz",
    default: null,
  })
  deletedAt: Date;

  constructor(data?: Partial<UserEntity>) {
    super();
    this.id = v7();
    Object.assign(this, data);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.isPasswordHashed()) {
      this.password = await hashPassword(this.password);
    }
  }

  private isPasswordHashed(): boolean {
    return this.password.startsWith("$argon2");
  }
}
