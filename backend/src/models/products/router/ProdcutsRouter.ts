import { Router } from "express";
import { ProductsController } from "../controller/ProductsController";

export const productRouter = Router();
const productController = new ProductsController();

productRouter
    .get("/listar", productController.List) // List all products
    .post("/", productController.Create) // Create a new product
    .put("/:id", productController.Update) // Update an existing product by ID
    .delete("/:id", productController.Delete) // Delete a product by ID
    .get("/:id", productController.GetById); // Get a product by ID