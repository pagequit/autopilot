import Vector2 from "./Vector2";

export default class Intersection {
  position: Vector2;
  offset: Number;

  constructor(position: Vector2, offset: Number) {
    this.position = position;
    this.offset = offset;
  }
}
