import { SalesProductsRepository } from "../model/Sales_ProductsRepository";
import pool  from "../../../db/DBConnection";
import { Pool  } from "pg";
import { Sales_Products } from "../model/Sales_Products";

type SalesProduct = {
  Id: string;
  Name: string;
  Stock: number;
  Description: string;
  Price: number;
  Last_update: Date;
  Reference: string;
}

export class Sales_ProductsServices implements SalesProductsRepository {
  connection: Pool;

  constructor() {
    this.connection = pool;
  }

  async getAll(): Promise<Sales_Products[]> {
    const response = new Promise<Sales_Products[]>((resolve, reject) => {
      const query = "SELECT * FROM Sales_Products";
      this.connection.query<Sales_Products>(query, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        const result = res.rows;
        const salesProducts = result.map((salesProduct) => {
          return new Sales_Products(
            salesProduct.Id,
            salesProduct.Name,
            salesProduct.Stock,
            salesProduct.Descripcion,
            salesProduct.Price,
            salesProduct.Last_Update,
            salesProduct.Reference
          );
        });
        resolve(salesProducts);
      });
    });
    return response;
  }

  async getById(id: string): Promise<Sales_Products | undefined> {
    const response = new Promise<Sales_Products | undefined>((resolve, reject) => {
      const query = "SELECT * FROM Sales_Products WHERE Id = $1";
      this.connection.query<Sales_Products>(query, [id], (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        const salesProduct = res.rows[0];
        if (salesProduct) {
          const result = new Sales_Products(
            salesProduct.Id,
            salesProduct.Name,
            salesProduct.Stock,
            salesProduct.Descripcion,
            salesProduct.Price,
            salesProduct.Last_Update,
            salesProduct.Reference
          );
          resolve(result);
        } else {
          resolve(undefined);
        }
      });
    });
    return response;
  }

  async create(salesProduct: Sales_Products): Promise<Sales_Products | undefined> {
    const response = new Promise<Sales_Products | undefined>((resolve, reject) => {
      const query = "INSERT INTO Sales_Products (Id, Name, Stock, Descripcion, Price, Last_Update, Reference) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
      this.connection.query<SalesProduct>(query, [
        salesProduct.Id,
        salesProduct.Name,
        salesProduct.Stock,
        salesProduct.Descripcion,
        salesProduct.Price,
        salesProduct.Last_Update,
        salesProduct.Reference
      ], (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        const createdSalesProduct = res.rows[0];
        resolve(new Sales_Products(
          createdSalesProduct.Id,
          createdSalesProduct.Name,
          createdSalesProduct.Stock,
          createdSalesProduct.Description,
          createdSalesProduct.Price,
          createdSalesProduct.Last_update,
          createdSalesProduct.Reference
        ));
      });
    });
    return response;
  }

   async update(salesProduct: Sales_Products): Promise<Sales_Products | undefined> {
    const response = new Promise<Sales_Products | undefined>((resolve, reject) => {
      const query = "UPDATE Sales_Products SET Name = $1, Stock = $2, Descripcion = $3, Price = $4, Last_Update = $5, Reference = $6 WHERE Id = $7 RETURNING *";
        this.connection.query<SalesProduct>(query, [
          salesProduct.Name,
          salesProduct.Stock,
          salesProduct.Descripcion,
          salesProduct.Price,
          salesProduct.Last_Update,
          salesProduct.Reference,
          salesProduct.Id
        ], (err, res) => {
            if (err) {
              reject(err);
              return;
            }
            const updatedSalesProduct = res.rows[0];
            resolve(new Sales_Products(
              updatedSalesProduct.Id,
              updatedSalesProduct.Name,
              updatedSalesProduct.Stock,
              updatedSalesProduct.Description,
              updatedSalesProduct.Price,
              updatedSalesProduct.Last_update,
              updatedSalesProduct.Reference
            ));
        });
        });
      return response;
    }

    async delete(id: string): Promise<number> {
    const response = new Promise<number>((resolve, reject) => {
      const query = "DELETE FROM Sales_Products WHERE Id = $1";
      this.connection.query(query, [id], (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        const rest= res.rows[0];
        resolve(rest);
      });
    });
    return response;
    }
}