import { EmailField, PasswordField, StringField, StringFieldOptional, UserNameField } from '@/decorators/field.decorators';

export class SignUpDto {
  @EmailField()
  email: string;

  @PasswordField()
  password: string;

  @StringField()
  firstName: string;

  @StringField()
  lastName: string;

}