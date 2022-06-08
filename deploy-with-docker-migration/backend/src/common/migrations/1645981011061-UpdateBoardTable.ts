import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateBoardTable1645981011061 implements MigrationInterface {
    name = 'UpdateBoardTable1645981011061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board\` ADD \`apple\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board\` DROP COLUMN \`apple\``);
    }

}
