export class Alarme {
  private _id: number;
  private _description: string;
  private _value: number;


  constructor(id: number, description: string, value: number) {
    this._id = id;
    this._description = description;
    this._value = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }
}
