export class AlarmLog {
  private _date: Date;
  private _device_id: number;
  private _log: string;
  private _log_level: string;
  private _value: number;

  constructor(date: Date, device_id: number, log: string, log_level: string, value: number) {
    this._date = date;
    this._device_id = device_id;
    this._log = log;
    this._log_level = log_level;
    this._value = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get device_id(): number {
    return this._device_id;
  }

  set device_id(value: number) {
    this._device_id = value;
  }

  get log(): string {
    return this._log;
  }

  set log(value: string) {
    this._log = value;
  }

  get log_level(): string {
    return this._log_level;
  }

  set log_level(value: string) {
    this._log_level = value;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }
}
