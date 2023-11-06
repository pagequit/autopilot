import Vector2 from "./Vector2";

export default class PointRenderer2D {
  point: Vector2;
  label: string;
  color: string;

  constructor(point: Vector2, label: string, color: string) {
    this.point = point;
    this.label = label;
    this.color = color;
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.point.x, this.point.y, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "14px Arial";
    ctx.fillText(this.label, this.point.x, this.point.y);
  }
}
