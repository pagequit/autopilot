import Vector2 from "./Vector2";

export default class Line2D {
  vertices: Array<Vector2>;

  constructor(vertices: Array<Vector2>) {
    this.vertices = vertices;
  }

  addPoint(point: Vector2) {
    this.vertices.push(point);
  }

  clearPoints() {
    this.vertices = [];
  }

  getPointCount(): number {
    return this.vertices.length;
  }

  getPointPosition(index: number): Vector2 {
    // Option<Vector2> might be better but I'm lazy
    return this.vertices[index] ?? new Vector2(0, 0);
  }

  removePoint(index: number) {
    this.vertices.splice(index, 1);
  }

  setPointPosition(index: number, position: Vector2) {
    this.vertices[index] = position;
  }
}
