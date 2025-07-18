import {
  DateFieldOptional,
  EmailField,
  PasswordFieldOptional,
  StringField,
  StringFieldOptional,
} from "@/decorators/field.decorators";

export class CreateUserDto {
  @StringField({ minLength: 1, maxLength: 1000 })
  name: string;

  @PasswordFieldOptional({ minLength: 1, maxLength: 100 })
  password: string;

  @EmailField()
  email: string;

  @StringFieldOptional()
  phoneNumber?: string;

  @StringFieldOptional()
  address?: string;

  @DateFieldOptional()
  dateOfBirth?: Date;

  @StringFieldOptional()
  bio?: string;
}
