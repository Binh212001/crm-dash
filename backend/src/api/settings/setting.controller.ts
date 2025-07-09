import { UpdateBaseResDto } from '@/api/base/dto/update-base.res.dto';
import { QuerySettingsPublicDto } from '@/api/settings/dtos/query-settings-public.dto';
import { QuerySettingsDto } from '@/api/settings/dtos/query-settings.dto';
import { SettingResDto } from '@/api/settings/dtos/setting-res.dto';
import { UpdateSettingsReqDto } from '@/api/settings/dtos/update-settings-req.dto';
import { ApiAuth, ApiPublic } from '@/decorators/http.decorators';
import {
  Body,
  Controller,
  Get,
  Patch,
  Query,
  SerializeOptions,
} from '@nestjs/common';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';
import { SettingService } from './setting.service';

@ApiTags('Settings')
@Controller({
  path: 'settings',
  version: '1',
})
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @ApiPublic({
    type: SettingResDto,
    summary: 'Get settings by key',
  })
  @Get('public')
  getSettingsFrontEnd(@Query() { key }: QuerySettingsPublicDto) {
    return this.settingService.getSettingsByKey(key);
  }

  @ApiAuth({
    type: SettingResDto,
    summary: 'Get settings by key',
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @ApiHeaders([
    {
      name: 'x-tenant',
      description: 'Tenant ID',
      required: true,
    },
  ])
  getSettings(@Query() { key }: QuerySettingsDto) {
    return this.settingService.getSettingsByKey(key);
  }

  @ApiAuth({ type: UpdateBaseResDto, summary: 'Update settings' })
  @Patch()
  upsertSettings(@Body() updateSettingDto: UpdateSettingsReqDto) {
    return this.settingService.upsertSettings(updateSettingDto);
  }
}
