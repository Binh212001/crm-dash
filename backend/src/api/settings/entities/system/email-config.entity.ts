import { EmailConfigDto } from '@/api/settings/dtos/system/email-config.dto';
import { SettingsEntity } from '@/api/settings/entities/setting.entity';
import { SettingKeyEnum } from '@/api/settings/enums/setting-key.enum';
import { ChildEntity } from 'typeorm';

@ChildEntity(SettingKeyEnum.EMAIL)
export class EmailConfigEntity extends SettingsEntity<EmailConfigDto> {}
