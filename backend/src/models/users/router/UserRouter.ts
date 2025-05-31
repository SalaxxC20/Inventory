import { Router } from "express";
import { UserController } from "../controller/UserController";

export const userRouter = Router();
const userController = new UserController();

userRouter
    .get("/listar", userController.List) // List all users
    .post("/", userController.Create) // Create a new user
    .put("/:id", userController.Update) // Update an existing user by ID
    .delete("/:id", userController.Delete) // Delete a user by ID
    .get("/:id", userController.GetById); // Get a user by ID
