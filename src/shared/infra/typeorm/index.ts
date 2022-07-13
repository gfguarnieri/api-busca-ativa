import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const dataSource = new DataSource({
  type: 'postgres',
  ssl: {
    rejectUnauthorized: false,
  },
  url: process.env.DATABASE_URL,
  entities: ['./src/modules/**/entities/*.ts'],
  migrations: ['./src/**/migrations/*.ts'],
});

dataSource.initialize().then(() => {
  console.log('Connected!');
}).catch(() => {
  console.error('Impossible to connect!');
});

export { dataSource };
