import { Request, Response } from "express";
import { ProductsServices } from "../services/ProductsServices";
import { Products } from "../model/Products";
import { v4 } from "uuid";

type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    reference: string;
}

export class ProductsController {
    private Service: ProductsServices;
    constructor() {
        this.Service = new ProductsServices();
    }

    List = async (req: Request, res: Response) => {
        try {
            const products = await this.Service.getAll();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving products", error });
        }
    };

    Create = async (req: Request, res: Response) => {
        try {
            const { name, description, price, stock, reference }: Product = req.body;
            const product = new Products(v4(), name, stock, description, price, new Date(), reference);
            const newProduct = await this.Service.create(product);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ message: "Error creating product", error });
        }
    };

    Update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name, description, price, stock, reference }: Product = req.body;
            const exist = await this.Service.getByid(id);
            if (exist) {
                const product = new Products(
                    exist.Id,
                    name,
                    stock,
                    description,
                    price,
                    new Date(),
                    reference
                );
                const updatedProduct = await this.Service.update(product);
                res.status(200).json(updatedProduct);
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error updating product", error });
        }
    };

    Delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const deletedCount = await this.Service.delete(id);
            if (deletedCount > 0) {
                res.status(200).json({ message: "Product deleted successfully" });
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error deleting product", error });
        }
    };

    GetById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const product = await this.Service.getByid(id);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error retrieving product", error });
        }
    }
}