export class Level{
id?: number;
name?: string;
language_id?: number;

constructor(name?: string, language_id?: number) {
this.name = name;
this.language_id = language_id;
}
}
