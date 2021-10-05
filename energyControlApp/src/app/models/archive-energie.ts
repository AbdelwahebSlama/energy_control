export class ArchiveEnergie {

  private _id_device: number;
  private _date: Date;
  private _cons_en_L1: number;
  private _cons_en_L2: number;
  private _cons_en_L3: number;
  private _cons_glbal: number;


  constructor(id_device: number, date: Date, cons_en_L1: number,
              cons_en_L2: number, cons_en_L3: number, cons_glbal: number) {
    this._id_device = id_device;
    this._date = date;
    this._cons_en_L1 = cons_en_L1;
    this._cons_en_L2 = cons_en_L2;
    this._cons_en_L3 = cons_en_L3;
    this._cons_glbal = cons_glbal;
  }

  get id_device(): number {
    return this._id_device;
  }

  set id_device(value: number) {
    this._id_device = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get cons_en_L1(): number {
    return this._cons_en_L1;
  }

  set cons_en_L1(value: number) {
    this._cons_en_L1 = value;
  }

  get cons_en_L2(): number {
    return this._cons_en_L2;
  }

  set cons_en_L2(value: number) {
    this._cons_en_L2 = value;
  }

  get cons_en_L3(): number {
    return this._cons_en_L3;
  }

  set cons_en_L3(value: number) {
    this._cons_en_L3 = value;
  }

  get cons_glbal(): number {
    return this._cons_glbal;
  }

  set cons_glbal(value: number) {
    this._cons_glbal = value;
  }
}
