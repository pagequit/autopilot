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

  constructor(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.controls = new Controls();
    this.speed = 0;
    this.maxSpeed = 4;
    this.acceleration = 1;
    this.friction = 0.2;
  }

  update() {
    if (this.controls.u) {
      this.speed -= this.acceleration;
    }
    if (this.controls.d) {
      this.speed += this.acceleration;
    }
    if (this.controls.l) {
      this.x -= 2;
    }
    if (this.controls.r) {
      this.x += 2;
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

    this.y += this.speed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
  }
}
