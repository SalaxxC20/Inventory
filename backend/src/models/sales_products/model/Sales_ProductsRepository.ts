import { Sales_Products } from './Sales_Products';

export interface SalesProductsRepository {
    getAll(): Promise<Sales_Products[]>; // Obtiene todos los productos de ventas
    getById(id: string): Promise<Sales_Products | undefined>; // Obtiene un producto de ventas por su ID
    create(salesProduct: Sales_Products): Promise<Sales_Products | undefined>; // Crea un nuevo producto de ventas
    update(salesProduct: Sales_Products): Promise<Sales_Products | undefined>; // Actualiza un producto de ventas existente
    delete(id: string): Promise<number>; // Elimina un producto de ventas por su ID
}
