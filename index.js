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
server.use(express.json());

// Rotas;
server.post("/singin", loginUser);
server.post("/singup", signUpUser);
server.get("/cart", getListSelected);


//Rotas Menu
server.use(routesHome);

server.listen(5000, () => {
  console.log(`Servidor funcionandona na porta ${PORT}`);
});
