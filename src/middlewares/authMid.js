import db from '../db.js'
//comentando
export async function midauth(req,res,next){
const {authorization} = req.headers;
const token = authorization?.replace('Bearer ',"");

if(!token){
    return res.status(401).send('Para prosseguir, favor fazer Login!');
}

const session = await db.collection('session').findOne({token});

if(!session){
   return res.status(400).send('Para prosseguir, favor fazer Login!');
}

const user = await db.collection('users').findOne({_id: session.userId})

if(!user){
   return res.status(401).send('Para prosseguir, favor fazer Login!');
}

res.locals.user = user;

next();
}