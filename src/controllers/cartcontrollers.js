import db from '../db.js'

export async function getListSelected(req, res){
    
    const user = res.locals.user;
    
    try{
      const selecteds = await db.collection('productsSelected').find({user}).toArray();
    
      return res.status(201).send(selecteds);
    }catch(error){
    return res.send(error)
    }
    };


    export async function deleteSelected(req, res){
      const user = res.locals.user;

      try {
        const deleted = db.collection("productsSelected").deleteOne({
          name: user
        });

        res.send(deleted)

      } catch (error) {
        
      }

    }