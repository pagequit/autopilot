import Line2D from "./lib/Line2D";
import Vector2 from "./lib/Vector2";

export default class Sensor {
  origin: Vector2;
  rayCount: number;
  rayLength: number;
  raySpread: number;
  rays: Array<Line2D>;

  constructor(origin: Vector2) {
    this.origin = origin;
    this.rayCount = 3;
    this.rayLength = 100;
    this.raySpread = Math.PI / 4;
    this.rays = [];
  }

  update() {
    this.rays = [];
  }
}
