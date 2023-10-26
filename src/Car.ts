import Controls from "./Controls";
import Vector2 from "./lib/Vector2";
import Angle from "./lib/Angle";
import Polygon from "./lib/Polygon";

export default class Car {
  position: Vector2;
  width: number;
  height: number;
  controls: Controls;
  speed: number;
  maxSpeed: number;
  acceleration: number;
  friction: number;
  angle: Angle;
  polygon: Polygon;
  damaged: boolean;

  constructor(positinon: Vector2, width: number, height: number) {
    this.position = positinon;
    this.width = width;
    this.height = height;
    this.controls = new Controls();
    this.speed = 0;
    this.maxSpeed = 3;
    this.acceleration = 0.2;
    this.friction = 0.1;
    this.angle = new Angle(0);
    this.polygon = new Polygon(positinon, []);
    this.damaged = false;
  }

  update() {
    this.move();
    this.updatePolygon();
  }

  updatePolygon() {
    this.polygon.vertices = [];
    const rad = Math.hypot(this.width, this.height) / 2;
    const alpha = Math.atan2(this.width, this.height);

    this.polygon.vertices.push(
      new Vector2(
        this.position.x - Math.sin(this.angle.degrees - alpha) * rad,
        this.position.y - Math.cos(this.angle.degrees - alpha) * rad,
      ),
    );

    this.polygon.vertices.push(
      new Vector2(
        this.position.x - Math.sin(this.angle.degrees + alpha) * rad,
        this.position.y - Math.cos(this.angle.degrees + alpha) * rad,
      ),
    );

    this.polygon.vertices.push(
      new Vector2(
        this.position.x - Math.sin(Math.PI + this.angle.degrees - alpha) * rad,
        this.position.y - Math.cos(Math.PI + this.angle.degrees - alpha) * rad,
      ),
    );

    this.polygon.vertices.push(
      new Vector2(
        this.position.x - Math.sin(Math.PI + this.angle.degrees + alpha) * rad,
        this.position.y - Math.cos(Math.PI + this.angle.degrees + alpha) * rad,
      ),
    );
  }

  move() {
    if (this.controls.u) {
      this.speed += this.acceleration;
    }
    if (this.controls.d) {
      this.speed -= this.acceleration;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed < -this.maxSpeed) {
      this.speed = -this.maxSpeed;
    }

    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    if (this.speed !== 0) {
      const flip = this.speed > 0 ? 1 : -1;
      if (this.controls.l) {
        this.angle.degrees += 0.02 * flip;
      }
      if (this.controls.r) {
        this.angle.degrees -= 0.02 * flip;
      }
    }

    this.position.x -= Math.sin(this.angle.degrees) * this.speed;
    this.position.y -= Math.cos(this.angle.degrees) * this.speed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(
      this.polygon.vertices[0].x,
      this.polygon.vertices[0].y,
    );
    for (let i = 1; i < this.polygon.vertices.length; i++) {
      ctx.lineTo(
        this.polygon.vertices[i].x,
        this.polygon.vertices[i].y,
      );
    }
    ctx.closePath();
    ctx.fill();
  }
}
