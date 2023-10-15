import lerp from "./lib/lerp";

export default class Road {
  x: number;
  width: number;
  laneCount: number;
  top: number;
  left: number;
  bottom: number;
  right: number;

  constructor(x: number, width: number, laneCount: number) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    this.left = x - width / 2;
    this.right = x + width / 2;

    const inifity = 100000000;
    this.top = -inifity;
    this.bottom = inifity;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = 4;
    ctx.strokeStyle = "white";

    for (let i = 0; i <= this.laneCount; i++) {
      ctx.beginPath();
      const x = lerp(
        this.left,
        this.right,
        i / this.laneCount,
      );
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke();
    }
  }
}
