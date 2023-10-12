import Controls from "./Controls";

export default class Car {
  x: number;
  y: number;
  w: number;
  h: number;
  controls: Controls;
  speed: number;
  maxSpeed: number;
  acceleration: number;
  friction: number;
  angle: number;

  constructor(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.controls = new Controls();
    this.speed = 0;
    this.maxSpeed = 4;
    this.acceleration = 0.4;
    this.friction = 0.2;
    this.angle = 0;
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
        this.angle += 0.02 * flip;
      }
      if (this.controls.r) {
        this.angle -= 0.02 * flip;
      }
    }

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);
    ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    ctx.restore();
  }
}
