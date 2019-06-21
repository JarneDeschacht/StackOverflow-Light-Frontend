export class User {
  private _userId: number;

  constructor(
    private _firstName: string,
    private _lastName: string,
    private _email: string
  ) {}

  static fromJSON(json: any): User {
    const usr = new User(json.firstName, json.lastName, json.email);
    usr._userId = json.userId;
    return usr;
  }
  get userId(): number {
    return this._userId;
  }
  get firstName(): string {
    return this._firstName;
  }
  get lastName(): string {
    return this._lastName;
  }
  get email(): string {
    return this._email;
  }
}
