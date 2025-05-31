
export class Users {
  Id: string;
  Name: string;
  Email: string;
  Password: string;
  Token: string | null;
  Verify: boolean;
  Auth: boolean;

  constructor(Id: string, Name: string, Email: string, Password: string, Token: string | null, Verify: boolean, Auth: boolean) {
    this.Id = Id;
    this.Name = Name;
    this.Email = Email;
    this.Password = Password;
    this.Token = Token;
    this.Verify = Verify;
    this.Auth = Auth;
  }

  get = () => {
    return {
      Id: this.Id,
      Name: this.Name,
      Email: this.Email,
      Password: this.Password,
      Token: this.Token,
      Verify: this.Verify,
      Auth: this.Auth
    }
  }
}