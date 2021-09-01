export default class User {
  id: string;
  name: string;
  email: string;
  password: string;
  token?: string;

  constructor(id: string, name: string, email: string, password: string, token?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.token = token;
  }

  public static fromJSON(json: {
    id: string;
    name: string;
    email: string;
    password: string;
    token?: string;
  }): User {
    return new User(json.id, json.name, json.email, json.password, json.token);
  }
}
