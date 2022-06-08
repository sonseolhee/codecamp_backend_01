import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateBoardTable1645978972920 implements MigrationInterface {
    name = 'UpdateBoardTable1645978972920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board\` ADD \`hobby\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board\` DROP COLUMN \`hobby\``);
    }

}
