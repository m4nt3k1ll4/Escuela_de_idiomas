export class Role {
  id?: number;
  description?: string | null | undefined;

  constructor(description?: string, id?: number) {
    this.id = id;
    this.description = description;
  }
}
