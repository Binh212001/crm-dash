import {
  SettingKeyEnum,
  SettingKeyEnumPublic,
} from '@/api/settings/enums/setting-key.enum';
import { EnumField } from '@/decorators/field.decorators';

export class QuerySettingsPublicDto {
  @EnumField(() => SettingKeyEnumPublic)
  key: SettingKeyEnum;
}
