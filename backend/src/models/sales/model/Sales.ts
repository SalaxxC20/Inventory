export class Sales {
    Id: string;
    Name: string;
    Stock: number;
    Description: string;
    Price: number;
    Last_Update: Date;
    Reference: string;

    constructor(Id: string, Name: string, Stock: number, Description: string, Price: number, Last_Update: Date, Reference: string) {
        this.Id = Id;
        this.Name = Name;
        this.Stock = Stock;
        this.Description = Description;
        this.Price = Price;
        this.Last_Update = Last_Update;
        this.Reference = Reference;
    }

    get = () => {
        return {
            Id: this.Id,
            Name: this.Name,
            Stock: this.Stock,
            Description: this.Description,
            Price: this.Price,
            Last_Update: this.Last_Update,
            Reference: this.Reference
        };
    }
}