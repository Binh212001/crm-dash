import { EmailConfigDto } from '@/api/settings/dtos/system/email-config.dto';
import { UpdateSettingsReqDto } from '@/api/settings/dtos/update-settings-req.dto';
import { EmailConfigEntity } from '@/api/settings/entities/system/email-config.entity';
import { SettingKeyEnum } from '@/api/settings/enums/setting-key.enum';
import { UnprocessableEntityException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export const getDto = (key: SettingKeyEnum): new () => object => {
  const objType = {
  
    [SettingKeyEnum.EMAIL]: EmailConfigDto,
  
  }[key];

  if (!objType) {
    throw new Error('Invalid object type');
  }
  return objType;
};

export const getEntity = (key: SettingKeyEnum) => {
  const objType = {
   
    [SettingKeyEnum.EMAIL]: EmailConfigEntity,
  
  }[key];

  if (!objType) {
    throw new Error('Invalid object type');
  }
  return objType;
};

export async function settingValidate(dto: UpdateSettingsReqDto) {
  const errors = await validate(getValidateData(dto), {
    forbidNonWhitelisted: true,
    whitelist: true,
  });
  if (errors.length > 0) {
    throw new UnprocessableEntityException(errors);
  }
}

export function getValidateData({ data, key }: UpdateSettingsReqDto) {
  return plainToInstance(getDto(key), data, {});
}
