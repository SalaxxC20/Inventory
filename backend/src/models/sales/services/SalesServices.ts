import { SalesRepository } from "../model/SalesRepository";
import { Sales } from "../model/Sales";
import pool from "../../../db/DBConnection";
import { Pool } from "pg";

type Sale = {
    id: string;
    name: string;
    satok: number;
    description: string;
    price: number;
    last_update: Date;
    reference: string;
};

export class SalesServices implements SalesRepository {
    connection: Pool;
    
    constructor() {
        this.connection = pool;
    }
    
    async getAll(): Promise<Sales[]> {
        const response = new Promise<Sales[]>((resolve, reject) => {
        const query = "SELECT * FROM Sales";
        this.connection.query<Sale>(query, (err, res) => {
            if (err) {
            reject(err);
            return;
            }
            const result = res.rows;
            const sales = result.map((sale) => {
            return new Sales(
                sale.id,
                sale.name,
                sale.satok,
                sale.description,
                sale.price,
                new Date(sale.last_update), //suponiendo que es la fecha actual
                sale.reference
            );
            });
            resolve(sales);
        });
        });
        return response;
    }
    
    async getById(id: string): Promise<Sales | undefined> {
        const response = new Promise<Sales | undefined>((resolve, reject) => {
        const query = "SELECT * FROM Sales WHERE id = $1";
        this.connection.query<Sale>(query, [id], (err, res) => {
            if (err) {
            reject(err);
            return;
            }
            const sale = res.rows[0];
            if (sale) {
            const result = new Sales(
                sale.id,
                sale.name,
                sale.satok,
                sale.description,
                sale.price,
                new Date(sale.last_update), //suponiendo que es la fecha actual
                sale.reference
            );
            resolve(result);
            } else {
            resolve(undefined);
            }
        });
        });
        return response;
    }

    async create(sale: Sales): Promise<Sales> {
        const response = new Promise<Sales>((resolve, reject) => {
            const query = "INSERT INTO Sales (id, name, satok, description, price, last_update, reference) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
            this.connection.query<Sale>(query, [sale.Id, sale.Name, sale.Stock, sale.Description, sale.Price, sale.Last_Update, sale.Reference], (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                const createdSale = res.rows[0];
                resolve(new Sales(
                    createdSale.id,
                    createdSale.name,
                    createdSale.satok,
                    createdSale.description,
                    createdSale.price,
                    new Date(createdSale.last_update),
                    createdSale.reference
                ));
            });
        });
        return response;
    }

    async update(sale: Sales): Promise<Sales | undefined> {
        const response = new Promise<Sales | undefined>((resolve, reject) => {
            const query = "UPDATE Sales SET name = $1, satok = $2, description = $3, price = $4, last_update = $5, reference = $6 WHERE id = $7 RETURNING *";
            this.connection.query<Sale>(query, [sale.Name, sale.Stock, sale.Description, sale.Price, sale.Last_Update, sale.Reference, sale.Id], (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                const updatedSale = res.rows[0];
                if (updatedSale) {
                    resolve(new Sales(
                        updatedSale.id,
                        updatedSale.name,
                        updatedSale.satok,
                        updatedSale.description,
                        updatedSale.price,
                        new Date(updatedSale.last_update),
                        updatedSale.reference
                    ));
                } else {
                    resolve(undefined);
                }
            });
        });
        return response;
    }

    async delete(id: string): Promise<number> {
        const response = new Promise<number>((resolve, reject) => {
            const query = "DELETE FROM Sales WHERE id = $1";
            this.connection.query(query, [id], (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                const rest = res.rows[0];
                resolve(rest);
            });
        });
        return response;
    }

}