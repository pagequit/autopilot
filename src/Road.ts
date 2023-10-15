import Line2D from "./lib/Line2D";
import Vector2 from "./lib/Vector2";
import lerp from "./lib/lerp";

export default class Road {
  center: number;
  width: number;
  laneCount: number;
  top: number;
  left: number;
  bottom: number;
  right: number;
  borders: Array<Line2D>;

  constructor(center: number, width: number, laneCount: number) {
    this.center = center;
    this.width = width;
    this.laneCount = laneCount;

    this.left = center - width / 2;
    this.right = center + width / 2;

    const pseudoInifity = 1000000;
    this.top = -pseudoInifity;
    this.bottom = pseudoInifity;

    const leftTop = new Vector2(this.left, this.top);
    const leftBottom = new Vector2(this.left, this.bottom);
    const rightTop = new Vector2(this.right, this.top);
    const rightBottom = new Vector2(this.right, this.bottom);

    this.borders = [
      new Line2D([leftTop, leftBottom]),
      new Line2D([rightTop, rightBottom]),
    ];
  }

  getLaneCenter(laneIndex: number) {
    const laneWidth = this.width / this.laneCount;
    return this.left + laneWidth / 2 + laneWidth * laneIndex;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = 4;
    ctx.strokeStyle = "white";

    ctx.setLineDash([20, 20]);
    for (let i = 1; i < this.laneCount; i++) {
      const x = lerp(
        this.left,
        this.right,
        i / this.laneCount,
      );

      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    for (const border of this.borders) {
      ctx.beginPath();
      ctx.moveTo(border.getPointPosition(0).x, border.getPointPosition(0).y);
      ctx.lineTo(border.getPointPosition(1).x, border.getPointPosition(1).y);
      ctx.stroke();
    }
  }
}
