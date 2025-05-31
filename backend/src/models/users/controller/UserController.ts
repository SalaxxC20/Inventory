import { Request, Response } from "express";
import { UsersService } from "../services/UsersService";
import { Users } from "../model/Users";
import { v4 } from "uuid";
import { hash, verify } from "argon2";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  token: string;
  verify: boolean;
  auth: boolean;
};

export class UserController {
  private Service: UsersService;
  constructor() {
    this.Service = new UsersService();
  }

  List = async (req: Request, res: Response) => {//listar todos los usuarios
    try {
      const users = await this.Service.getAll();//obtener todos los usuarios
      res.status(200).json(users);
    } catch (error) {//error al obtener los usuarios
      res.status(500).json({ message: "Error retrieving users", error });
    }
  };

  Create = async (req: Request, res: Response) => {//crear un nuevo usuario
    try {
      const { name, email, password }: User = req.body;
      const Hash = await hash(password); //hash de la contraseña
      const user = new Users(v4(), name, email, Hash, null, false, false); //instancia de la clase Users
      const newUser = await this.Service.create(user);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  };

  Update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, email, password }: User = req.body;
      const Exist = await this.Service.getById(id); //buscar el usuario por id
      if (Exist) {
        const compare = verify(Exist.Password, password); //verificar si la contraseña es correcta
        let contrasenia = Exist.Password;
        if (!compare) {
          contrasenia = await hash(password); //hash de la contraseña
        } //verificar si la contraseña es correcta
        const user = new Users(
          Exist.Id,
          name,
          email,
          contrasenia,
          Exist.Token,
          Exist.Verify,
          Exist.Auth
        ); //instancia de la clase Users
        const updatedUser = await this.Service.update(user); //actualizar el usuario
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
  };

  Delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const Exist = await this.Service.getById(id);
      if (Exist) {
        const deletedUser = await this.Service.delete(id);
        if (deletedUser) {
          res.status(200).json({ message: "User deleted successfully" });
        }
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
    }
  };

  GetById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await this.Service.getById(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user", error });
    }
  }
}
