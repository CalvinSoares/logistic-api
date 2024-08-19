import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from '../app';

dotenv.config();

mongoose.set('strictQuery', true);

const url = `${process.env.MONGO_URL_DB}`;

async function startDB() {
  mongoose.set('strictQuery', true);
  try {
    await mongoose.connect(url);
    console.log('Conectado ao MongoDB!');
    app.listen(process.env.PORT);
  } catch (error) {
    console.log(error);
  }
}

export { startDB };
