# RabbitMQ Fixes for PRECONDITION_FAILED Error

## Problem
The error `PRECONDITION_FAILED - reply consumer cannot acknowledge` occurs when there's a mismatch between RabbitMQ producer and consumer configurations, particularly with acknowledgment settings.

## Root Causes
1. **Missing prefetch configuration**: Without proper prefetch settings, consumers might not handle messages correctly
2. **Inconsistent acknowledgment settings**: Mismatch between `noAck` settings
3. **Missing global prefetch configuration**: Needed for proper message distribution

## Fixes Applied

### 1. Updated Microservice Configuration (`main.ts`)
```typescript
app.connectMicroservice<MicroserviceOptions>({
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'],
    queue: process.env.RABBITMQ_QUEUE || 'email-queue',
    queueOptions: {
      durable: true,
    },
    noAck: false,
    prefetchCount: 1,           // Added
    isGlobalPrefetchCount: true, // Added
  },
});
```

### 2. Updated Client Configuration (`user.module.ts`)
```typescript
ClientsModule.register([
  {
    name: 'EMAIL_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'],
      queue: process.env.RABBITMQ_QUEUE || 'email-queue',
      queueOptions: {
        durable: true,
      },
      noAck: false,
      prefetchCount: 1,           // Added
      isGlobalPrefetchCount: true, // Added
    },
  },
]),
```

### 3. Improved Consumer Error Handling (`email-consumer.controller.ts`)
- Added better logging
- Improved error handling with proper acknowledgment
- Added retry mechanism with `nack(message, false, true)`

### 4. Enhanced Producer Error Handling (`user.service.ts`)
- Added proper subscription handling for emitted messages
- Added error handling for message sending

## Environment Variables
Add these to your `.env` file:
```env
RABBITMQ_URL=amqp://guest:guest@localhost:5672
RABBITMQ_QUEUE=email-queue
```

## Testing
Run the test script to verify RabbitMQ connection:
```bash
cd backend
node test-rabbitmq.js
```

## Key Configuration Parameters

### `prefetchCount: 1`
- Limits the number of unacknowledged messages a consumer can receive
- Prevents overwhelming the consumer
- Ensures fair distribution of messages

### `isGlobalPrefetchCount: true`
- Applies prefetch count globally across all consumers
- Ensures consistent behavior across the application

### `noAck: false`
- Enables manual acknowledgment
- Allows for proper error handling and retry mechanisms

## Troubleshooting

### If the error persists:
1. **Restart RabbitMQ service**:
   ```bash
   docker-compose restart rabbitmq
   ```

2. **Clear existing queues** (if safe to do so):
   - Access RabbitMQ Management UI at `http://localhost:15672`
   - Login with `guest:guest`
   - Delete and recreate the `email-queue`

3. **Check RabbitMQ logs**:
   ```bash
   docker-compose logs rabbitmq
   ```

4. **Verify connection**:
   ```bash
   node test-rabbitmq.js
   ```

## Best Practices
1. Always use environment variables for configuration
2. Implement proper error handling in consumers
3. Use appropriate prefetch counts based on your workload
4. Monitor RabbitMQ metrics through the management UI
5. Implement dead letter queues for failed messages 