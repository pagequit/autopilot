import Vector2 from "./Vector2";

export default class Polygon {
  origin: Vector2;
  vertices: Array<Vector2>;
  collide: (poly: Polygon) => void;

  constructor(
    origin: Vector2,
    vertices: Array<Vector2>,
    collide: (poly: Polygon) => void = () => {},
  ) {
    this.origin = origin;
    this.vertices = vertices;
    this.collide = collide;
  }

  draw(ctx: CanvasRenderingContext2D, color: string = "black") {
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;

    ctx.moveTo(
      this.vertices[0].x,
      this.vertices[0].y,
    );
    for (let i = 1; i < this.vertices.length; i++) {
      ctx.lineTo(
        this.vertices[i].x,
        this.vertices[i].y,
      );
    }
    ctx.closePath();
    ctx.stroke();
  }
}
