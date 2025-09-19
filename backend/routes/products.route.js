import { Router } from "express";
import { getProducts, createProducts,deleteProduct,updateProduct } from "../controller/product.controller.js";

const router = Router();

router.get("/",getProducts);

router.post("/",createProducts);

router.delete("/:id",deleteProduct);

router.put("/:id",updateProduct);



export default router;


