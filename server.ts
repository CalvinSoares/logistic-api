import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
// Removi `body-parser` porque `express.json()` já faz o trabalho necessário
import orderRouter from "./src/routes/orderRoutes";
import userRouter from "./src/routes/userRoutes";

dotenv.config();

const app: Application = express();
const PORT = 5000;

// Aplicar middlewares antes das rotas
app.use(cors()); // Habilita CORS
app.use(express.json()); // Processa JSON no corpo da requisição

// Rotas
app.use("/api", orderRouter);
app.use("/api/users", userRouter);

// Conexão ao banco de dados
mongoose
  .connect(process.env.MONGO_URL_DB as string)
  .then(() => console.log("connectou ai meu compadre"))
  .catch((err) => console.log("deu ruim", err));

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});
