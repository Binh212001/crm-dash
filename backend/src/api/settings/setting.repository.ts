import { BaseRepository } from '@/api/base/base.repository';
import { SettingsEntity } from '@/api/settings/entities/setting.entity';
import { SettingKeyEnum } from '@/api/settings/enums/setting-key.enum';
import { CacheKey } from '@/constants/cache.constant';
import { createCacheKey } from '@/utils/cache.util';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { DataSource, EntityTarget } from 'typeorm';

@Injectable()
export class SettingRepository extends BaseRepository<SettingsEntity> {
  constructor(
    private readonly dataSource: DataSource,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super(SettingsEntity, dataSource.createEntityManager());
  }

  async getSettingsByKey<T = SettingsEntity>(key: SettingKeyEnum): Promise<T> {
    const cacheKey = createCacheKey(CacheKey.SETTING, key);
    const cacheSetting = await this.cacheManager.store.get<T>(cacheKey);
    if (cacheSetting) {
      return cacheSetting;
    }
    const data = await this.findOneOrFail({ where: { key } });
    await this.cacheManager.store.set(cacheKey, data, 0);
    return data as T;
  }

  async upsertSettings(
    target: EntityTarget<unknown>,
    entity: Partial<SettingsEntity>,
  ) {
    const result = await this.manager.upsert(target, entity, {
      conflictPaths: { key: true },
    });
    await this.cacheManager.store.del(
      createCacheKey(CacheKey.SETTING, entity.key),
    );
    return result;
  }
}
