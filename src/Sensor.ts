import Line2D from "./lib/Line2D";
import Vector2 from "./lib/Vector2";
import lerp from "./lib/lerp";
import Angle from "./lib/Angle";
import Intersection from "./lib/Intersection";
import getIntersection from "./lib/getIntersection";

export default class Sensor {
  origin: Vector2;
  angle: Angle;
  rayCount: number;
  rayLength: number;
  raySpread: number;
  rays: Array<Line2D>;
  readings: Array<Intersection>;

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
      this.readings.push(this.getReading(ray, segments));
    }
  }

  getReading(ray: Line2D, segments: Array<Line2D>): Intersection {
    let touches: Array<Intersection> = [];

    for (const segment of segments) {
      const touch = getIntersection(
        ray.vertices[0],
        ray.vertices[1],
        segment.vertices[0],
        segment.vertices[1],
      );

      touches.push(touch);
    }

    touches = touches.filter((t) => t.offset !== 0).sort((a, b) =>
      a.offset - b.offset
    );

    return touches[0] ?? new Intersection(new Vector2(0, 0), 0);
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
    for (let i = 0; i < this.rays.length; i++) {
      let end: Vector2 = this.rays[i].vertices[1];
      // TODO: think about this offset convention
      if (this.readings[i].offset !== 0) {
        end = this.readings[i].position;
      }

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      ctx.moveTo(
        this.rays[i].vertices[0].x,
        this.rays[i].vertices[0].y,
      );
      ctx.lineTo(
        end.x,
        end.y,
      );
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.moveTo(
        this.rays[i].vertices[1].x,
        this.rays[i].vertices[1].y,
      );
      ctx.lineTo(
        end.x,
        end.y,
      );
      ctx.stroke();
    }
  }
}
