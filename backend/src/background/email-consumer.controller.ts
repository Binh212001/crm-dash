import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext, MessagePattern } from '@nestjs/microservices';

@Controller()
export class EmailConsumerController {
    @MessagePattern('send_email')
    async handleSendEmail(@Payload() data: any, @Ctx() context: RmqContext) {
      console.log("🚀 ~ EmailConsumerController ~ handleSendEmail ~ data:", data);
      const channel = context.getChannelRef();
      const message = context.getMessage();
    
      try {
        // xử lý logic gửi email
        console.log('📧 Processing email:', data);
        
        // Simulate email processing
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Acknowledge the message after successful processing
        console.log('✅ Email processed successfully');
      } catch (err) {
        console.error('❌ Error sending mail:', err.message);
    
        // Reject the message and requeue it for retry
        // Use nack with requeue=true to retry the message
        channel.nack(message, false, true);
        console.log('🔄 Message requeued for retry');
      }
    }
}