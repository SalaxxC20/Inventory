import { Request, Response } from "express";
import { Sales_ProductsServices } from "../services/Sales_ProductsServices";
import { Sales_Products} from "../model/Sales_Products";
import { v4 } from "uuid";

type SalesProduct = {
    Id: string;
    Name: string;
    Stock: number;
    Description: string;
    Price: number;
    Last_update: Date;
    Reference: string;
};

export class Sales_ProductsController {
    private Service: Sales_ProductsServices;

    constructor() {
        this.Service = new Sales_ProductsServices();
    }

    List = async (req: Request, res: Response) => {
        try {
            const salesProducts = await this.Service.getAll();
            res.status(200).json(salesProducts);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving sales products", error });
        }
    };

    Create = async (req: Request, res: Response) => {
        try {
            const { Name, Description, Price, Stock, Reference }: SalesProduct = req.body;
            const salesProduct = new Sales_Products(v4(), Name, Stock, Description, Price, new Date(), Reference);
            const newSalesProduct = await this.Service.create(salesProduct);
            res.status(201).json(newSalesProduct);
        } catch (error) {
            res.status(500).json({ message: "Error creating sales product", error });
        }
    };

    Update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { Name, Description, Price, Stock, Reference }: SalesProduct = req.body;
            const exist = await this.Service.getById(id);
            if (exist) {
                const salesProduct = new Sales_Products(
                    exist.Id,
                    Name,
                    Stock,
                    Description,
                    Price,
                    new Date(),
                    Reference
                );
                const updatedSalesProduct = await this.Service.update(salesProduct);
                res.status(200).json(updatedSalesProduct);
            } else {
                res.status(404).json({ message: "Sales product not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error updating sales product", error });
        }
    };

    Delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const exist = await this.Service.getById(id);
            if (exist) {
                await this.Service.delete(id);
                res.status(204).send();
            } else {
                res.status(404).json({ message: "Sales product not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error deleting sales product", error });
        }
    };

    Getbyid = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const salesProduct = await this.Service.getById(id);
            if (salesProduct) {
                res.status(200).json(salesProduct);
            } else {
                res.status(404).json({ message: "Sales product not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error retrieving sales product", error });
        }
    }
}