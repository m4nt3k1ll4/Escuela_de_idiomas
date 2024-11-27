import { Role } from "./role.model";

export class Response {
  token: string;
  role?: Role;

  constructor(private value: string,) {
    this.token = value;
  }
}
