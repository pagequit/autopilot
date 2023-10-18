import Controls from "./Controls";
import Vector2 from "./lib/Vector2";
import Angle from "./lib/Angle";

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
  }

  update() {
    this.move();
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
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(-this.angle.degrees);
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }
}
