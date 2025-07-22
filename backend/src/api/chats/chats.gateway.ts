import { ConfigService } from "@nestjs/config";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatRepository } from "./chat.repository";
import { UseGuards } from "@nestjs/common";
import { WsJwtGuard } from "@/guards/ws-auth.graud";
import { UserResponseDto } from "../user/dto/user-response.dto";
import { CurrentUser } from "@/decorators/current-user.decorator";

@WebSocketGateway(3000, {
  cors: {
    origin: "*",
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatRepository: ChatRepository) {}
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log("WebSocket server initialized");
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
    client.emit("events", { message: "Welcome! You are connected." });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("joinRoom")
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string }
  ) {
    const { roomId } = data;
    if (roomId) {
      client.join(roomId);
      client.emit("joinedRoom", { roomId });
      console.log(`Client ${client.id} joined room ${roomId}`);
    } else {
      client.emit("error", { message: "roomId is required to join a room." });
    }
  }
  @SubscribeMessage("createMessage")
  @UseGuards(WsJwtGuard)
  async handleCreateMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; content: string }
  ) {
    const { roomId, content } = data;
    const { user } = client.data;

    if (!roomId || !content) {
      client.emit("error", { message: "roomId and content are required." });
      return;
    }

    try {
      // user is injected by WsJwtGuard (see ws-auth.graud.ts)
      const chat = this.chatRepository.create({
        room: { id: roomId },
        content,
        sender: { id: user.id },
      });
      const savedChat = await this.chatRepository.save(chat);

      const message = {
        id: savedChat.id,
        roomId: savedChat.room.id,
        content: savedChat.content,
        sender: { id: user.id, name: user.name, avatar: user.avatar },
        createdAt: savedChat.createdAt,
      };

      this.server.to(roomId).emit("newMessage", message);
      client.emit("messageSent", { success: true, message });
    } catch (error) {
      client.emit("error", {
        message: "Failed to save message.",
        error: error?.message || error,
      });
    }
  }
}
