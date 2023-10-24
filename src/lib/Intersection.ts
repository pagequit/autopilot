import Vector2 from "./Vector2";

export default class Intersection {
  position: Vector2;
  offset: number;

  constructor(position: Vector2, offset: number) {
    this.position = position;
    this.offset = offset;
  }
}
