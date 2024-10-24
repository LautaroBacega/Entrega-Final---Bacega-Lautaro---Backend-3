import mongoose from 'mongoose';
import 'dotenv/config'

const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://admin:bulBjAkT2McLc8e5@codercluster.ywbopgt.mongodb.net/coder69900?retryWrites=true&w=majority&appName=CoderCluster'

export const initMongoDB = async () => {
  try {
      mongoose.set('strictQuery', false)
      await mongoose.connect(MONGO_URL);
      console.log("Conectado a la base de datos de MONGODB");
  } catch (error) {
      console.log(error);
  }
};

