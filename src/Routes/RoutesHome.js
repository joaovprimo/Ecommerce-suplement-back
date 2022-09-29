import express from "express";
import { getListProd, postProductBuying,getproductsSelecteds} from "../controllers/homecontrollers.js";
import { deleteSelected } from "../controllers/cartcontrollers.js";
import { midauth } from "../middlewares/authMid.js";


const router = express.Router();

router.get('/home',getListProd);
router.delete("/delete/:idProd", deleteSelected);
router.use(midauth);
router.get('/home/selecteds',getproductsSelecteds);
router.post('/home/', postProductBuying);


export default router;