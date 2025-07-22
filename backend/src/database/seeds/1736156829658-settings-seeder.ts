import { EmailConfigEntity } from "@/api/settings/entities/system/email-config.entity";
import { ItemDirection } from "@/api/settings/enums/item-direction.enum";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { v7 } from "uuid";

export class SettingsSeeder1736156829658 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    _: SeederFactoryManager
  ): Promise<any> {
    return dataSource.transaction(async (entityManager) => {
      //seed email config

      await entityManager
        .createQueryBuilder()
        .insert()
        .into(EmailConfigEntity)
        .values(
          new EmailConfigEntity({
            data: {
              other: {
                title: "Hệ thống Vmaster",
                address: "noreply.vmaster@gmail.com",
                password: "12345678",
                server: "smtp.gmail.com",
                port: 465,
                secure: true,
                ignoreTLS: false,
                requireTLS: false,
              },
              server: "other",
              emailTemplate: {
                accountCreated: {
                  content: "",
                  enable: false,
                  subject: "",
                  variable: [],
                },
              },
            },
          })
        )
        .orIgnore()
        .execute();

      // await entityManager.createQueryBuilder().insert().into(Entity).values(new Entity()).orIgnore().execute();
      //TODO: seed other settings here
    });
  }
}
