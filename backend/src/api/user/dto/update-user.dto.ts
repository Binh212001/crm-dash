import {
  UserNameField,
  StringFieldOptional,
  EmailFieldOptional,
  PasswordFieldOptional,
  DateFieldOptional,
} from '@/decorators/field.decorators';

export class UpdateUserDto {
  @UserNameField({ required: false })
  username?: string;

  @StringFieldOptional({ minLength: 1, maxLength: 100 })
  firstName?: string;

  @StringFieldOptional({ minLength: 1, maxLength: 100 })
  lastName?: string;

  @EmailFieldOptional()
  email?: string;

  @PasswordFieldOptional()
  password?: string;

  @StringFieldOptional()
  phoneNumber?: string;

  @StringFieldOptional()
  address?: string;

  @DateFieldOptional()
  dateOfBirth?: Date;

  @StringFieldOptional()
  bio?: string;

  @StringFieldOptional()
  avatar?: string;
} 