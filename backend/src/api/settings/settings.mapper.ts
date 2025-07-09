import { SettingResDto } from '@/api/settings/dtos/setting-res.dto';
import { SettingsEntity } from '@/api/settings/entities/setting.entity';
import { plainToInstance } from 'class-transformer';
import { SettingKeyEnum } from './enums/setting-key.enum';
import { getDto } from './settings.util';

export class SettingsMapper {
  public static toDto({
    key,
    setting,
  }: {
    key: SettingKeyEnum;
    setting: SettingsEntity;
  }): SettingResDto {
    return Object.assign(new SettingResDto(), {
      key,
      data: plainToInstance(getDto(key), setting.data, {
        ignoreDecorators: true,
      }),
    });
  }
}
