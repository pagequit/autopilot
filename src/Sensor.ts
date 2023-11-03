import Line2D from "./lib/Line2D";
import Vector2 from "./lib/Vector2";
import lerp from "./lib/lerp";
import Angle from "./lib/Angle";
import Intersection from "./lib/Intersection";
import getIntersection from "./lib/getIntersection";
import Polygon from "./lib/Polygon";

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

  update(polygons: Array<Polygon>) {
    this.castRays();
    this.readings = [];
    for (const ray of this.rays) {
      for (const polygon of polygons) {
        this.readings.push(this.getReading(ray, polygon));
      }
    }
  }

  getReading(ray: Line2D, poly2: Polygon): Intersection {
    let touches: Array<Intersection> = [];

    const poly1 = new Polygon(
      this.origin,
      ray.vertices,
    );

    for (let i = 0; i < poly1.vertices.length; i++) {
      for (let j = 0; j < poly2.vertices.length; j++) {
        const touch = getIntersection(
          poly1.vertices[i],
          poly1.vertices[(i + 1) % poly1.vertices.length],
          poly2.vertices[j],
          poly2.vertices[(j + 1) % poly2.vertices.length],
        );

        touches.push(touch);
      }
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
      const reading = this.readings[i].offset !== 0
        ? this.readings[i].position
        : this.rays[i].vertices[1];

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      ctx.moveTo(
        this.rays[i].vertices[0].x,
        this.rays[i].vertices[0].y,
      );
      ctx.lineTo(
        reading.x,
        reading.y,
      );
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.moveTo(
        reading.x,
        reading.y,
      );
      ctx.lineTo(
        this.rays[i].vertices[1].x,
        this.rays[i].vertices[1].y,
      );
      ctx.stroke();
    }
  }
}
