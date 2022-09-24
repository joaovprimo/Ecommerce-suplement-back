import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { loginUser, signUpUser } from "./src/controllers/userControllers.js";
import routesHome from './src/Routes/RoutesHome.js';
import {getListSelected, deleteSelected} from "./src/controllers/cartcontrollers.js"

dotenv.config();
const PORT = process.env.PORT;

const server = express();



server.use(cors());
server.use(json());

// Rotas;
server.post("/", loginUser);
server.post("/sign-up", signUpUser);
server.get("/cart", getListSelected);
server.delete("/delete", deleteSelected)

//Rotas Menu
server.use(routesHome);

server.listen(PORT, () => {
  console.log(`Servidor funcionandona na porta ${PORT}`);
});
