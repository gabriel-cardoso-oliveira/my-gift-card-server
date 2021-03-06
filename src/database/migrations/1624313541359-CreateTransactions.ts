import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateTransactions1624313541359 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'transaction_type',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'transaction_value',
            type: 'numeric',
            isNullable: false,
          },
          {
            name: 'transaction_date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'store_identification',
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
    await queryRunner.dropTable('transactions');
  }

}
