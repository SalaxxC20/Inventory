import { Users } from "./Users";

export interface UsersRepository { /// Es un contrato donde se definen los metodos que se van a implementar en el repositorio
  getAll(): Promise<Users[]>;
  getById(id: string): Promise<Users | undefined>;
  create(user: Users): Promise<Users | undefined>;
  update(user: Users): Promise<Users | undefined>;
  delete(id: string): Promise<number>;
}