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
  async handleCreateMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      roomId: string;
      content: string;
      sender: {
        id: string;
        name: string;
        avatar?: string;
      };
    }
  ) {
    const { roomId, content, sender } = data;
    if (!roomId || !content || !sender || !sender.id) {
      client.emit("error", {
        message: "roomId, content, and sender are required.",
      });
      return;
    }

    // Save the message to the database
    try {
      const chat = this.chatRepository.create({
        room: { id: roomId },
        content,
        sender: { id: sender.id },
      });
      const savedChat = await this.chatRepository.save(chat);

      // Build the message object to emit (including sender info)
      const message = {
        id: savedChat.id,
        roomId: savedChat.room.id,
        content: savedChat.content,
        sender: {
          id: sender.id,
          name: sender.name,
          avatar: sender.avatar,
        },
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
