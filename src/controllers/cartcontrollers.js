import db from '../db.js'

export async function getListSelected(req, res){
    
    const user = res.locals.user;
    
    try{
      
      const selecteds = await db.collection('productsSelected').find({user}).toArray();
      console.log(selecteds)

     
    
      return res.status(201).send(selecteds);
    }catch(error){
    return res.send(error)
    }
    };


    export async function deleteSelected(req, res){
    const {idProd} = req.params;
      const {idProduct} = req.body;
      console.log(idProd)

      try {
        const deleted = await db.collection("productsSelected").deleteOne({
          idProduct:idProd
        });
        const prods = await db.collection("productsSelected").find().toArray();

        return res.status(200).send(prods);

      } catch (error) {
        return res.send(error);
      }

    }