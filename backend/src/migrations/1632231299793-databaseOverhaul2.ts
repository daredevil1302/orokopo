import {MigrationInterface, QueryRunner} from "typeorm";

export class databaseOverhaul21632231299793 implements MigrationInterface {
    name = 'databaseOverhaul21632231299793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."item" ADD "imageUrl" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."item" DROP COLUMN "imageUrl"`);
    }

}
