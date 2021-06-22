import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateGiftCard1624369143796 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'gift_card',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'gifcard_number',
            type: 'integer',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'giftcard_password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'giftcard_validated',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'giftcard_message',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('gift_card');
  }

}
