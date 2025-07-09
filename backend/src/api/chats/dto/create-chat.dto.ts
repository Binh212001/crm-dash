import { UUIDField, StringField } from "@/decorators/field.decorators";

export class CreateChatDto {
    @UUIDField()
    readonly roomId: string;

    @StringField()
    readonly content: string;
}
