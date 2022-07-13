import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const dataSource = new DataSource({
  type: 'postgres',
  ssl: {
    rejectUnauthorized: false,
  },
  url: process.env.DATABASE_URL,
  entities: ['./dist/modules/**/entities/*.js'],
  migrations: ['./dist/**/migrations/*.js'],
});

dataSource.initialize().then(() => {
  console.log('Connected!');
}).catch(() => {
  console.error('Impossible to connect!');
});

export { dataSource };
