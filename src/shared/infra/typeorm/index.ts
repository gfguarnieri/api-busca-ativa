import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: 5432,
  username: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  entities: ['./src/modules/**/entities/*.ts'],
  migrations: ['./src/**/migrations/*.ts'],
});

dataSource.initialize().then(() => {
  console.log('Connected!');
}).catch(() => {
  console.error('Impossible to connect!');
});

export { dataSource };
