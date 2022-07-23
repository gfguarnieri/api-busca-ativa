import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateClassrooms1654633999199 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'classrooms',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'year',
          type: 'int',
        },
        {
          name: 'semester',
          type: 'int',
        },
        {
          name: 'fk_course',
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
          columnNames: ['fk_course'],
          name: 'FKCourseClassRoom',
          referencedTableName: 'courses',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('classrooms');
  }
}
