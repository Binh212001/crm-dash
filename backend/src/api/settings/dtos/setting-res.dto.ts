import { SettingKeyEnum } from '@/api/settings/enums/setting-key.enum';
import { EnumField } from '@/decorators/field.decorators';
import { Expose } from 'class-transformer';

export class SettingResDto<T = object> {
  @EnumField(() => SettingKeyEnum)
  @Expose()
  key: SettingKeyEnum;

  @Expose()
  data: T;
}
