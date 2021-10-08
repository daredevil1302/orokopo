import {MigrationInterface, QueryRunner} from "typeorm";

export class ratingNullable1632406059176 implements MigrationInterface {
    name = 'ratingNullable1632406059176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."item" ALTER COLUMN "rating" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."item" ALTER COLUMN "rating" SET NOT NULL`);
    }

}
