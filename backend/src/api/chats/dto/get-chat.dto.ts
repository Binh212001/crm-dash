import { StringFieldOptional, NumberFieldOptional } from '@/decorators/field.decorators';

export class GetChatDto {

    @StringFieldOptional()
    readonly last_id?: string;

    @NumberFieldOptional({ default: 10 })
    readonly limit?: number = 10;

    constructor(data: Partial<GetChatDto>) {
        Object.assign(this, data);
    }
}
