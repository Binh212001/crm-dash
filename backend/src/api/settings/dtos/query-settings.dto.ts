import { SettingKeyEnum } from '@/api/settings/enums/setting-key.enum';
import { EnumField } from '@/decorators/field.decorators';

export class QuerySettingsDto {
  @EnumField(() => SettingKeyEnum)
  key: SettingKeyEnum;
}
