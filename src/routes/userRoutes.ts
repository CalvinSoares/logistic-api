import { Router } from "express";
import { register, login } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

// Rotas protegidas (exemplo de rota para admin)
userRouter.get("/admin", (req, res) => {
  res.send("Acesso concedido ao admin.");
});

export default userRouter;
