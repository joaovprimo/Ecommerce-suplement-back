import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import joi from "joi";
import db from "../db.js";

const loginSchema = joi.object({
  email: joi.string().required().min(1),
  password: joi.string().required().min(1),
});

const signUpSchema = joi.object({
  name: joi.string().required().min(1),
  email: joi.string().required().min(1),
  password: joi.string().required().min(1)
});

// Controlles;
export async function loginUser(req, res) {
  const { email, password } = req.body;

  /*const validation = loginSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    const erros = validation.error.details.map((detail) => detail.message);
    res.status(422).send(erros);
    return;
  }*/

  try {
    const user = await db.collection("users").findOne({ email });
    if(!user){
      return res.status(400).send("Usuário não cadastrado")
    }
    const existPassword = user ? bcrypt.compareSync(password, user.password) :false;
    if (user && existPassword) {
     await db.collection('session').deleteMany({
        userId: user._id
      })
      const token = uuid();
      await db.collection("session").insertOne({
        token,
        userId: user._id
      })
     return  res.status(201).send({name:user.name, token});
    } else {
      return res.status(401).send("Senha ou email incorretos");
    }
  } catch (error) {
    console.log(error);
      return res.sendStatus(error);
  }
}

export async function signUpUser(req, res) {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  /*const validation = signUpSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    const erros = validation.error.details.map((detail) => detail.message);
    res.status(422).send(erros);
    return;
  }*/

  try {
    const user = await db.collection("users").findOne({email});
    if(!user){
      await db.collection("users").insertOne({
        name,
        email,
        password: bcrypt.hashSync(password, 10)
      });
    }else{
      return res.status(400).send("e-mail already in use")
    }
   
    res.send(user);
  } catch (error) {
    console.log(error.message);
  }
}
