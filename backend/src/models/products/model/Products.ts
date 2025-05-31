export class Products {
 Id : string;
 Name: string;
 Stock: number;
 Descripcion: string;
 Price: number;
 Last_Update: Date;
 Reference: string;

 constructor(Id: string, Name: string, Stock: number, Descripcion: string, Price: number, Last_Update: Date, Reference: string) {
   this.Id = Id;
   this.Name = Name;
   this.Stock = Stock;
   this.Descripcion = Descripcion;
   this.Price = Price;
   this.Last_Update = Last_Update;
   this.Reference = Reference;
 }

 get = () => {
    return{
      Id: this.Id,
      Name: this.Name,
      Stock: this.Stock,
      Descriptin: this.Descripcion,
      Price: this.Price,
      Last_Update:this.Last_Update,
      Reference: this.Reference
    }
  }
}