export class Course {
  id?: number;
  name: string;
  level_id: number;


  constructor(name: string, level_id: number) {
    this.name = name;
    this.level_id = level_id;
  }
}
