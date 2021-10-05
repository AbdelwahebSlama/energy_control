export class Prediction {
  private _id: number;
  private _periode: Date;
  private _prediction: number;


  constructor(id: number, periode: Date, prediction: number) {
    this._id = id;
    this._periode = periode;
    this._prediction = prediction;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get periode(): Date {
    return this._periode;
  }

  set periode(value: Date) {
    this._periode = value;
  }

  get prediction(): number {
    return this._prediction;
  }

  set prediction(value: number) {
    this._prediction = value;
  }
}
