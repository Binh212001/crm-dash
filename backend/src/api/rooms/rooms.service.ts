import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomRepository } from './room.repository';
import { RoomEntity } from './entities/room.entity';
import { UserEntity } from '@/api/user/entities/user.entity';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class RoomsService {

    constructor(
        private readonly roomRepository: RoomRepository,
        private readonly userRepository: UserRepository,
    ) { }

    async create(userId: string, createRoomDto: CreateRoomDto): Promise<RoomEntity> {
        // Find the user by id
        const defaultUser = await this.userRepository.findOne({
            where: { id: userId }
        });

        if (!defaultUser) {
            throw new Error('User not found');
        }

        // Ensure the creator is added to the members array
        const room = this.roomRepository.create({
            ...createRoomDto,
            members: [defaultUser]
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
