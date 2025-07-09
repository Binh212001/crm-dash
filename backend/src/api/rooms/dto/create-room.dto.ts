import { StringFieldOptional } from '@/decorators/field.decorators';
import { EnumField } from '@/decorators/field.decorators';
import { RoomType } from '../enums/room-type.enum';
import { StringField } from '@/decorators/field.decorators';
import { ArrayNotEmpty, IsArray, ValidateIf } from 'class-validator';

export class CreateRoomDto {

    @StringFieldOptional()
    @ValidateIf(o => o.type !== RoomType.PERSONAL)
    name?: string;

    @StringField({ each: true })
    @IsArray()
    @ArrayNotEmpty()
    members: string[];

    @EnumField(() => RoomType, { required: true, default: RoomType.PERSONAL })
    @ValidateIf(o => o.type)
    type: RoomType;
}
