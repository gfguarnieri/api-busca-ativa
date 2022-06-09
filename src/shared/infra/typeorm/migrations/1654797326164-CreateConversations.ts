import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateConversations1654797326164 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(new Table({
      name: 'conversations',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'date',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'description',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'fk_admin',
          type: 'uuid',
          isNullable: false,
        },
        {
          name: 'fk_student',
          type: 'uuid',
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
      ],
      foreignKeys: [
        {
          name: 'FKStudentConversations',
          columnNames: ['fk_student'],
          referencedColumnNames: ['id'],
          referencedTableName: 'students',
        },
        {
          name: 'FKAdminConversations',
          columnNames: ['fk_admin'],
          referencedColumnNames: ['id'],
          referencedTableName: 'admins',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('conversations');
  }
}
