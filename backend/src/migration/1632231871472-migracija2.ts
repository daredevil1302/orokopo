import {MigrationInterface, QueryRunner} from "typeorm";

export class migracija21632231871472 implements MigrationInterface {
    name = 'migracija21632231871472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."item" ADD "imageUrl" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."item" DROP COLUMN "imageUrl"`);
    }

}
