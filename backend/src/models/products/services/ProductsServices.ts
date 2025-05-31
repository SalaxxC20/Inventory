import { ProductsRepository } from "../model/ProductsRepository";
import pool from "../../../db/DBConnection";
import { Pool} from "pg";
import { Products } from "../model/Products";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  reference: string;

}

export class ProductsServices implements ProductsRepository {
  connection : Pool;

  constructor() {
    this.connection = pool;
  }

  async getAll(): Promise<Products[]> {
    const response = new Promise<Products[]>((resolve, rejecet)=>{
      const query ="SELECT * FROM Products";
      this.connection.query<Product>(query, (err, res)=>{
        if (err){
          rejecet(err);
          return;
        }
        const result =res.rows;
        const products = result.map((products)=>{
          return new Products(
            products.id,
            products.name,
            products.stock,
            products.description,
            products.price,
            new Date(), //suponiendo que es la fecha actual
            products.reference
          )
        })
        resolve(products)
      })
    })
    return response;
  }


  async getByid(id: string): Promise<Products | undefined> {
    const response = new Promise<Products | undefined>((resolve, reject)=>{
      const query = "SELECT * FROM Products WHERE  id =$1";
      this.connection.query<Product>(query,[id],(err, res)=>{
        if(err){
          reject(err);
          return;
        }
        const products = res.rows[0]
        if(products){
          const result = new Products(
            products.id,
            products.name,
            products.stock,
            products.description,
            products.price,
            new Date(), //suponiendo que es la fecha actual
            products.reference
          )
          resolve(result)
        }
        else{
          resolve(undefined)
        }
      })
    })
    return response;
  }

  async create(producto: Products): Promise<Products | undefined> {
      const response = new Promise<Products | undefined>((resolve, reject)=>{
        const query = "INSERT INTO Products (name, stock, descripcion, price, last_update, reference) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
        this.connection.query<Product>(query, [producto.Name, producto.Stock, producto.Descripcion, producto.Price, producto.Last_Update, producto.Reference], (err, res)=>{
          if(err){
            reject(err);
            return;
          }
          const products = res.rows[0]
          if(products){
            const result = new Products(
              products.id,
              products.name,
              products.stock,
              products.description,
              products.price,
              new Date(), 
              products.reference
            )
            resolve(result)
          }
          else{
            resolve(undefined)
          }
        })
      })
    return response;
  }

  async update(producto: Products): Promise<Products | undefined> {
      const response = new Promise<Products | undefined>((resolve, reject)=>{
        const query = "UPDATE Products SET name = $1, stock = $2, descripcion = $3, price = $4, last_update = $5, reference = $6 WHERE id = $7 RETURNING *";
        this.connection.query<Product>(query, [producto.Name, producto.Stock, producto.Descripcion, producto.Price, producto.Last_Update, producto.Reference, producto.Id], (err, res)=>{
          if(err){
            reject(err);
            return;
          }
          const products = res.rows[0]
          if(products){
            const result = new Products(
              products.id,
              products.name,
              products.stock,
              products.description,
              products.price,
              new Date(),
              products.reference
            )
            resolve(result)
          }
          else{
            resolve(undefined)
          }
        })
      })
    return response;
  }

  async delete(id: string): Promise<number> {
      const response = new Promise<number>((resolve, reject)=>{
        const query = "DELETE FROM Products WHERE id = $1";
        this.connection.query(query, [id], (err, res)=>{
          if(err){
            reject(err);
            return;
          }
          const rest = res.rows[0]
          resolve(rest);
        })
      })
      return response;
  }
}



