import {
  BooleanFieldOptional,
  ClassFieldOptional,
  NumberFieldOptional,
  StringFieldOptional,
} from "@/decorators/field.decorators";
import { IsArray, IsIn } from "class-validator";

class Template {
  @BooleanFieldOptional()
  enable: boolean;

  @StringFieldOptional()
  subject: string;

  @StringFieldOptional()
  content: string;
  @IsArray()
  @StringFieldOptional({ each: true })
  variable: string[];
}

class OtherConfig {
  @StringFieldOptional()
  title: string;
  @StringFieldOptional()
  address: string;
  @StringFieldOptional()
  password: string;
  @StringFieldOptional()
  server: string;
  @NumberFieldOptional()
  port: number;
  @BooleanFieldOptional()
  secure: boolean;
  @BooleanFieldOptional()
  ignoreTLS: boolean;
  @BooleanFieldOptional()
  requireTLS: boolean;
}

class EmailTemplate {
  @ClassFieldOptional(() => Template)
  accountCreated: Template;
}

export class EmailConfigDto {
  @IsIn(["other"])
  server: string;
  @ClassFieldOptional(() => OtherConfig)
  other: OtherConfig;
  @ClassFieldOptional(() => EmailTemplate)
  emailTemplate: EmailTemplate;
}
