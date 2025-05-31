import { Router } from "express";
import { SalesController } from "../controller/SalesController";

export const salesRouter = Router();
const salesController = new SalesController();

salesRouter
    .get("/listar", salesController.List) // List all sales
    .post("/", salesController.Create) // Create a new sale
    .put("/:id", salesController.Update) // Update an existing sale by ID
    .delete("/:id", salesController.Delete) // Delete a sale by ID
    .get("/:id", salesController.getById); // Get a sale by ID
