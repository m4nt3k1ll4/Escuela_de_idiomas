export class Student {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  level_id?: number;
  courses: any[];

  constructor(
    name?: string,
    email?: string,
    phone?: string,
    level_id?: number,
    courses: any[] = []

  ) {

    this.name = name;
    this.email = email;
    this.phone = phone;
    this.level_id = level_id;
    this.courses = courses;
  }
}
