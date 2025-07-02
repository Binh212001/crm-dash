import { Expose } from 'class-transformer';

export class CustomerResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phone?: string;

  @Expose()
  country?: string;

  @Expose()
  address?: string;

  @Expose()
  city?: string;

  @Expose()
  postalCode?: string;

  @Expose()
  orders: number;

  @Expose()
  totalSpent: number;

  @Expose()
  lastSeen?: Date;

  @Expose()
  lastOrder?: Date;

  @Expose()
  avatar?: string;

  @Expose()
  tags?: string[];
}