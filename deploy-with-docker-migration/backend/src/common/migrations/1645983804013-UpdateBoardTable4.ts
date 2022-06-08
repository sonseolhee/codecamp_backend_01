import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateBoardTable41645983804013 implements MigrationInterface {
    name = 'UpdateBoardTable41645983804013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board\` ADD \`apple4\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board\` DROP COLUMN \`apple4\``);
    }

}
