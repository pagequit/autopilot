import Vector2 from "./Vector2";

export default class Polygon {
  origin: Vector2;
  vertices: Array<Vector2>;

  constructor(origin: Vector2, vertices: Array<Vector2>) {
    this.origin = origin;
    this.vertices = vertices;
  }
}
