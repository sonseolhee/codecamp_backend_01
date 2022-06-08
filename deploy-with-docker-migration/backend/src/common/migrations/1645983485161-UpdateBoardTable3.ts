import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateBoardTable31645983485161 implements MigrationInterface {
    name = 'UpdateBoardTable31645983485161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board\` ADD \`apple2\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD \`apple3\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board\` DROP COLUMN \`apple3\``);
        await queryRunner.query(`ALTER TABLE \`board\` DROP COLUMN \`apple2\``);
    }

}
