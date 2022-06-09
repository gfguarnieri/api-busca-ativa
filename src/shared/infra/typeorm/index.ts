import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'buscaativa',
  database: 'buscaativa',
  password: '123456',
  entities: ['./src/modules/**/entities/*.ts'],
  migrations: ['./src/**/migrations/*.ts'],
});

dataSource.initialize().then(() => {
  console.log('Connected!');
}).catch(() => {
  console.error('Impossible to connect!');
});

export { dataSource };
