import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStudents1654782374030 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(new Table({
      name: 'students',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'cellphone',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'fk_classroom',
          type: 'uuid',
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
          columnNames: ['fk_classroom'],
          name: 'FKClassroomStudent',
          referencedColumnNames: ['id'],
          referencedTableName: 'classrooms',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('students');
  }
}
