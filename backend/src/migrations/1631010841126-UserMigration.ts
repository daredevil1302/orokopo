import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserMigration1631010841126 implements MigrationInterface {
  name = 'UserMigration1631010841126';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."user" ADD "dinamo" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "dinamo"`);
  }
}
