import Line2D from "./lib/Line2D";
import Vector2 from "./lib/Vector2";
import lerp from "./lib/lerp";
import Angle from "./lib/Angle";

export default class Sensor {
  origin: Vector2;
  angle: Angle;
  rayCount: number;
  rayLength: number;
  raySpread: number;
  rays: Array<Line2D>;
  readings: Array<Vector2>;

  constructor(origin: Vector2, angel: Angle) {
    this.origin = origin;
    this.angle = angel;
    this.rayCount = 5;
    this.rayLength = 140;
    this.raySpread = Math.PI / 2;
    this.rays = [];
    this.readings = [];
  }

  update(segments: Array<Line2D>) {
    this.castRays();
    this.readings = [];
    for (const ray of this.rays) {
      // TODO: continue here
    }
  }

  castRays() {
    this.rays = [];
    for (let i = 0; i < this.rayCount; i++) {
      const rayAngle = lerp(
        this.raySpread / 2,
        -this.raySpread / 2,
        i / (this.rayCount - 1),
      ) + this.angle.degrees;

      const start = new Vector2(
        this.origin.x,
        this.origin.y,
      );

      const end = new Vector2(
        this.origin.x -
          Math.sin(rayAngle) * this.rayLength,
        this.origin.y -
          Math.cos(rayAngle) * this.rayLength,
      );

      this.rays.push(
        new Line2D([start, end]),
      );
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const ray of this.rays) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      ctx.moveTo(
        ray.vertices[0].x,
        ray.vertices[0].y,
      );
      ctx.lineTo(
        ray.vertices[1].x,
        ray.vertices[1].y,
      );
      ctx.stroke();
    }
  }
}
