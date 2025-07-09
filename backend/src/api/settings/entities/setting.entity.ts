import { SettingKeyEnum } from '@/api/settings/enums/setting-key.enum';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Column, Entity, TableInheritance } from 'typeorm';

@Entity('settings')
@TableInheritance({
  column: {
    type: 'varchar',
    name: 'key',
    length: 255,
    primary: true,
    primaryKeyConstraintName: 'pk_settings_key',
  },
})
export abstract class SettingsEntity<T = object> extends AbstractEntity {
  key: SettingKeyEnum;

  @Column({
    type: 'jsonb',
  })
  data: T;

  @Column({
    type: 'text',
    default: '',
  })
  description: string;

  constructor(partial: Partial<SettingsEntity<T>>) {
    super();
    Object.assign(this, partial);
  }
}
