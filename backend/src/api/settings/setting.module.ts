import { SettingRepository } from '@/api/settings/setting.repository';
import { Module } from '@nestjs/common';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';

@Module({
  imports: [],
  controllers: [SettingController],
  providers: [SettingService, SettingRepository],
  exports: [SettingService, SettingRepository],
})
export class SettingModule {}
