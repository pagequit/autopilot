/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import Car from "./Car";
import Road from "./Road";

export default function main() {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  canvas.height = window.innerHeight;
  canvas.width = 200;

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const road = new Road(canvas.width / 2, canvas.width, 3);
  const car = new Car(100, 100, 30, 50);

  (function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    road.draw(ctx);

    car.update();
    car.draw(ctx);

    requestAnimationFrame(animate);
  })();
}
