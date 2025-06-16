import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: process.env.DB_DIALECT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to Database successfully!');
  } catch (err) {
    console.error('Error connecting:', err);
  }
})();

export default sequelize;
