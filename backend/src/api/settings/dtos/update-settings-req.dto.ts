import { SettingKeyEnum } from '@/api/settings/enums/setting-key.enum';
import { getEntity, settingValidate } from '@/api/settings/settings.util';
import { EnumField } from '@/decorators/field.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional } from 'class-validator';

export class UpdateSettingsReqDto {
  @EnumField(() => SettingKeyEnum)
  key: SettingKeyEnum;

  @IsOptional()
  @IsObject()
  @ApiProperty({
    required: true,
    type: Object,
  })
  data: object;

  get entityType() {
    return getEntity(this.key);
  }

  async validate() {
    await settingValidate(this);
  }
}
