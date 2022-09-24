import db from '../db.js'
//comentando
export async function midauth(req,res,next){
const {authorization} = req.headers;
const token = authorization?.replace('Bearer ',"");

if(!token){
    return res.status(401).send('erro1');
}

const session = await db.collection('session').findOne({token});

if(!session){
   return res.status(401).send('erro2');
}

const user = await db.collection('users').findOne({_id: session.userId})

if(!user){
   return res.status(401).send('erro3');
}

res.locals.user = user;

next();
}