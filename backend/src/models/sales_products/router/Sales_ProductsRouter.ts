import { Router } from "express";
import { Sales_ProductsController } from "../controller/Sales_ProductsController";

export const salesProductRouter = Router();
const salesProductController = new Sales_ProductsController();

salesProductRouter
    .get("/listar", salesProductController.List) // List all sales products
    .post("/", salesProductController.Create) // Create a new sales product
    .put("/:id", salesProductController.Update) // Update an existing sales product by ID
    .delete("/:id", salesProductController.Delete) // Delete a sales product by ID
    .get("/:id", salesProductController.Getbyid); // Get a sales product by ID