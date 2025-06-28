import { Module } from '@nestjs/common';
import { EmailConsumerController } from './email-consumer.controller';

@Module({
    imports:[],
  controllers: [EmailConsumerController],
})
export class BackgroundModule {}
