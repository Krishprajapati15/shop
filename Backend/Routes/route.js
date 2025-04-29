import { Router } from "express";
import { getUserController, loginController, logoutController, registerController } from "../Controllers/authController.js";
import { deleteProductController, getProductsController, insertProductController, updateProductController } from "../Controllers/productController.js";
import authMiddleware from "../Middleware/authMiddleware.js";
import { createNewSaleController, deleteSaleController, getSalesController } from "../Controllers/salesController.js";

export const route = Router();

// auth endpoint:
route.post("/login", loginController);
route.post("/register", registerController);
route.get("/logout", logoutController);
route.get("/getUser",authMiddleware, getUserController);

// product endpoint://need verifytoken
route.get("/products",authMiddleware, getProductsController); 
route.post("/insert",authMiddleware, insertProductController); 
route.post("/update",authMiddleware, updateProductController); 
route.post("/delete",authMiddleware, deleteProductController); 

// sales endpoint://need verifytoken
route.get("/getsales",authMiddleware, getSalesController); 
route.post("/createsales",authMiddleware, createNewSaleController); 
route.post("/deletesales",authMiddleware, deleteSaleController); 