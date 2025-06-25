import { Expose } from 'class-transformer';

export class CustomerResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  orders: number;

  @Expose()
  totalSpent: number;

  @Expose()
  city?: string;

  @Expose()
  lastSeen?: Date;

  @Expose()
  lastOrder?: Date;

  @Expose()
  avatar?: string;
} 