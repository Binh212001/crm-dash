const amqp = require('amqplib');

async function testRabbitMQ() {
  try {
    console.log('🔌 Testing RabbitMQ connection...');
    
    // Connect to RabbitMQ
    const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672');
    console.log('✅ Connected to RabbitMQ');
    
    // Create channel
    const channel = await connection.createChannel();
    console.log('✅ Channel created');
    
    // Declare queue
    const queueName = process.env.RABBITMQ_QUEUE || 'email-queue';
    await channel.assertQueue(queueName, { durable: true });
    console.log(`✅ Queue '${queueName}' declared`);
    
    // Send a test message
    const testMessage = { 
      test: true, 
      timestamp: new Date().toISOString(),
      message: 'Test email message'
    };
    
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(testMessage)));
    console.log('✅ Test message sent to queue');
    
    // Close connection
    await connection.close();
    console.log('✅ Connection closed');
    
  } catch (error) {
    console.error('❌ RabbitMQ test failed:', error.message);
    process.exit(1);
  }
}

testRabbitMQ(); 