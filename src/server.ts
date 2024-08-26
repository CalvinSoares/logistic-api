import { startDB } from './db/mongoDB';
import Loaders from './db/Loaders';

const dbStarters = {
  mongoDB: startDB,
};

const loaders = new Loaders(dbStarters);
loaders.start();
