import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderEntity, OrderStatus, PaymentStatus } from '@/api/order/entities/order.entity';
import { ON_ORDER_SUCCESS } from './event.const';

export interface OrderSuccessEvent {
  order: OrderEntity;
  customerEmail?: string;
  customerName?: string;
}

@Injectable()
export class OrderEventHandler {
  @OnEvent(ON_ORDER_SUCCESS)
  async handleOrderSuccess(payload: OrderSuccessEvent) {
    try {
      const { order, customerEmail, customerName } = payload;
      
      console.log(`Order ${order.orderNumber} created successfully for customer: ${customerName || 'Unknown'}`);
      
      if (customerEmail) {
        await this.sendOrderConfirmationEmail(order, customerEmail, customerName);
      }
      
      await this.updateInventory(order);
      
      await this.notifyAdmin(order);
      
    } catch (error) {
      console.error('Error handling order success event:', error);
    }
  }

  private async sendOrderConfirmationEmail(
    order: OrderEntity, 
    customerEmail: string, 
    customerName?: string
  ) {
    console.log(`Sending confirmation email to ${customerEmail} for order ${order.orderNumber}`);
  }

  private async updateInventory(order: OrderEntity) {
    console.log(`Updating inventory for order ${order.orderNumber}`);
  }

  private async notifyAdmin(order: OrderEntity) {
    console.log(`Notifying admin about new order ${order.orderNumber}`);
  }
}
