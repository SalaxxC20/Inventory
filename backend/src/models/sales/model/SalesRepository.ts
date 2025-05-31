import { Sales } from "./Sales";

export interface SalesRepository {
    getAll(): Promise<Sales[]>; // Obtiene todas las ventas
    getById(id: string): Promise<Sales | undefined>; // Obtiene una venta por su ID
    create(sale: Sales): Promise<Sales | undefined>; // Crea una nueva venta
    update(sale: Sales): Promise<Sales | undefined>; // Actualiza una venta existente   
    delete(id: string): Promise<number>; // Elimina una venta por su ID
}