import { Request, Response } from 'express';
import { SalesServices } from '../services/SalesServices';
import { Sales } from '../model/Sales';
import { v4 } from 'uuid';

type Sale = {
    id: string;
    name: string;
    satok: number;
    description: string;
    price: number;
    last_update: Date;
    reference: string;
};

export class SalesController {
    private Service: SalesServices;

    constructor() {
        this.Service = new SalesServices();
    }

    List = async (req: Request, res: Response) => {
        try {
            const sales = await this.Service.getAll();
            res.status(200).json(sales);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving sales", error });
        }
    };

    Create = async (req: Request, res: Response) => {
        try {
            const { name, description, price, satok, reference }: Sale = req.body;
            const sale = new Sales(v4(), name, satok, description, price, new Date(), reference);
            const newSale = await this.Service.create(sale);
            res.status(201).json(newSale);
        } catch (error) {
            res.status(500).json({ message: "Error creating sale", error });
        }
    };

    Update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name, description, price, satok, reference }: Sale = req.body;
            const exist = await this.Service.getById(id);
            if (exist) {
                const sale = new Sales(
                    exist.Id,
                    name,
                    satok,
                    description,
                    price,
                    new Date(),
                    reference
                );
                const updatedSale = await this.Service.update(sale);
                res.status(200).json(updatedSale);
            } else {
                res.status(404).json({ message: "Sale not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error updating sale", error });
        }
    };

    Delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await this.Service.delete(id);
            if (result > 0) {
                res.status(200).json({ message: "Sale deleted successfully" });
            } else {
                res.status(404).json({ message: "Sale not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error deleting sale", error });
        }
    };

    getById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const sale = await this.Service.getById(id);
            if (sale) {
                res.status(200).json(sale);
            } else {
                res.status(404).json({ message: "Sale not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error retrieving sale", error });
        }
    };
}

