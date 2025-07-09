import { UpdateBaseResDto } from '@/api/base/dto/update-base.res.dto';
import { SettingResDto } from '@/api/settings/dtos/setting-res.dto';
import { UpdateSettingsReqDto } from '@/api/settings/dtos/update-settings-req.dto';
import { SettingKeyEnum } from '@/api/settings/enums/setting-key.enum';
import { SettingRepository } from '@/api/settings/setting.repository';
import { SettingsMapper } from '@/api/settings/settings.mapper';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import _ from 'lodash';

@Injectable()
export class SettingService {
  private readonly logger = new Logger(SettingService.name);

  constructor(
    private readonly settingRepository: SettingRepository,
    private readonly event: EventEmitter2,
  ) {}

  async getSettingsByKey(key: SettingKeyEnum): Promise<SettingResDto> {
    const data = await this.settingRepository.getSettingsByKey(key);
    return SettingsMapper.toDto({ key, setting: data });
  }

  async upsertSettings(
    updateDto: UpdateSettingsReqDto,
  ): Promise<UpdateBaseResDto> {
    await updateDto.validate();
    const currentSetting = await this.settingRepository.findOneBy({
      key: updateDto.key,
    });
    _.mergeWith(currentSetting, updateDto, (objValue, srcValue) => {
      if (_.isArray(objValue)) {
        return srcValue;
      }
    });
    await this.settingRepository.upsertSettings(
      updateDto.entityType,
      currentSetting,
    );

    return {
      data: true,
    };
  }
}
