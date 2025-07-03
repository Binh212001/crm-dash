import {
  DateFieldOptional,
  EmailField,
  PasswordFieldOptional,
  StringField,
  StringFieldOptional,
  UserNameField
} from '@/decorators/field.decorators';

export class CreateUserDto {
  @UserNameField()
  username: string;

  @StringField({ minLength: 1, maxLength: 100 })
  firstName: string;

  @StringField({ minLength: 1, maxLength: 100 })
  lastName: string;

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

  @StringFieldOptional()
  avatar?: string;

 
} 