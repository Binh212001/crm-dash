import {
  EmailField,
  PasswordField,
  StringField,
} from "@/decorators/field.decorators";

export class SignUpDto {
  @EmailField()
  email: string;

  @PasswordField()
  password: string;

  @StringField()
  name: string;
}
