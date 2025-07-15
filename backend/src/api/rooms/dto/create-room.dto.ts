import { StringFieldOptional } from '@/decorators/field.decorators';
import { ValidateIf } from 'class-validator';
import { RoomType } from '../enums/room-type.enum';

export class CreateRoomDto {
    @StringFieldOptional()
    @ValidateIf(o => o.type !== RoomType.PERSONAL)
    name?: string;

    @StringFieldOptional()
    description: string;

}
