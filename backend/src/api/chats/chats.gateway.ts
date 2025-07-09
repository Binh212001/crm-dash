import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayInit } from '@nestjs/websockets';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
// import { WsJwtAuthGuard } from 'src/config/guard/ws-jwt-auth.guard';

@WebSocketGateway({
  port: 800,
  namespace: '/chats',
})
export class ChatsGateway implements OnGatewayInit {

  constructor(private readonly chatsService: ChatsService) {}

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    // server.use(wsAuthMiddleware);
  }

  @SubscribeMessage('create')
  async handleCreate(
    @ConnectedSocket() client: Socket,
    @MessageBody() createChatDto: CreateChatDto
  ) {
    // Fix: Use correct type assertion to access user on handshake
    const handshake: any = client.handshake;
    const senderId = handshake?.user?._id?.toString();
    if (!senderId) {
      client.emit('error', { message: 'Unauthorized' });
      return;
    }
    try {
      const chat = await this.chatsService.create(senderId, createChatDto);
      this.server.emit('new-chat', chat);
    } catch (error) {
      client.emit('error', { message: error?.message || 'Failed to create chat' });
    }
  }
}
