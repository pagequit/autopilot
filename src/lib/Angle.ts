export default class Angle {
  degrees: number;

  constructor(degrees: number) {
    this.degrees = degrees;
  }

  getNormalizedDegrees(): number {
    return this.degrees % 360;
  }

  getNormalized(): number {
    return this.getNormalizedDegrees() / 360;
  }
}
