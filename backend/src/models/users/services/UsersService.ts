import { UsersRepository } from "../model/UsersRepository";
import pool from "../../../db/DBConnection";
import { Connection, Pool, QueryResult } from "pg";
import { Users } from "../model/Users";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  token: string;
  verify: boolean;
  auth: boolean;
}

export class UsersService implements UsersRepository {
  connection: Pool;

  constructor() {
    this.connection = pool;
  }

  async getAll(): Promise<Users[]> {
    const response = new Promise<Users[]>((resolve, reject) => { /// Promesa de que va a retornar los usuarios
      const query = "SELECT * FROM users";
      this.connection.query<User>(query, (err, res) => {
        if (err) { /// Si hay un error, lo rechaza
         reject(err); /// Devuelve el error
         return;
        }
        const result = res.rows; /// Resive los resultados Siempre es un array
        const users = result.map((user) => {
          return new Users(
            user.id,
            user.name,
            user.email,
            user.password,
            user.token,
            user.verify,
            user.auth
          )
        })
        resolve(users) /// Resuelve la promesa con los usuarios
      })
    })
    return response;
  }

  async getById(id: string): Promise<Users | undefined> {
      const response = new Promise<Users | undefined>((resolve, reject ) =>{
        const query = "SELECT * FROM users WHERE id = $1";
        this.connection.query<User>(query,[id], (err, res)=>{
          if (err){
            reject(err);
            return;
          }
          const user = res.rows[0]
          if (user ){
            const result = new Users(
              user.id,
              user.name,
              user.email,
              user.password,
              user.token,
              user.verify,
              user.auth
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
}