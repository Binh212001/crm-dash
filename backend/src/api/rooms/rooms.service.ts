import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomRepository } from './room.repository';
import { RoomEntity } from './entities/room.entity';
import { UserEntity } from '@/api/user/entities/user.entity';

@Injectable()
export class RoomsService {

    constructor(
        private readonly roomRepository: RoomRepository,
    ) { }

    async create(userId: string, createRoomDto: CreateRoomDto): Promise<RoomEntity> {
        // Ensure the creator is included in the members list
        if (!createRoomDto.members.includes(userId)) {
            createRoomDto.members.push(userId);
        }

        // Create RoomEntity instance
        const room = this.roomRepository.create({
            ...createRoomDto,
            members: createRoomDto.members.map(id => {
                const user = new UserEntity();
                user.id = id;
                return user;
            }),
        });

        return await this.roomRepository.save(room);
    }

    async getByRequest(userId: string): Promise<RoomEntity[]> {
        return await this.roomRepository.find({
            where: {
                members: {
                    id: userId,
                },
            },
            relations: ['members'],
        });
    }
}
