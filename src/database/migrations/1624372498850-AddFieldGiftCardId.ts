import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddFieldGiftCardId1624372498850 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('transactions', new TableColumn({
        name: 'giftcard_id',
        type: 'uuid',
        isNullable: false,
      }));

      await queryRunner.createForeignKey(
        'transactions',
        new TableForeignKey({
          name: 'TransactionGiftCard',
          columnNames: ['giftcard_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'gift_card',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('transactions', 'TransactionGiftCard');

      await queryRunner.dropColumn('transactions', 'giftcard_id');
    }

}
