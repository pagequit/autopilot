import Controls from "./Controls";

export default class Car {
  x: number;
  y: number;
  w: number;
  h: number;
  controls: Controls;

  constructor(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.controls = new Controls();
  }

  update() {
    if (this.controls.u) {
      this.y -= 5;
    }
    if (this.controls.d) {
      this.y += 5;
    }
    if (this.controls.l) {
      this.x -= 5;
    }
    if (this.controls.r) {
      this.x += 5;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
  }
}
