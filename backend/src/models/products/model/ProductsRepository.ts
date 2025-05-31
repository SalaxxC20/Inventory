import { Products } from "./Products";

export interface ProductsRepository {
    getAll(): Promise<Products[]>; // Obtiene todos los productos
    getByid(id: string): Promise<Products | undefined>; // Obtiene un producto por su ID
    create(producto: Products): Promise<Products | undefined>; // Crea un nuevo producto
    update(producto: Products): Promise<Products | undefined>; // Actualiza un producto existente
    delete(id: string): Promise<number>; // Elimina un producto por su ID
}
