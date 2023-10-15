/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import Car from "./Car";
import Road from "./Road";
import Sensor from "./Sensor";
import Vector2 from "./lib/Vector2";

export default function main() {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  canvas.height = window.innerHeight;
  canvas.width = 200;

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const road = new Road(canvas.width / 2, canvas.width, 3);
  const car = new Car(
    new Vector2(
      road.getLaneCenter(Math.floor(road.laneCount / 2)),
      canvas.height / 2,
    ),
    30,
    50,
  );
  const sensor = new Sensor(car.position);

  (function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    car.update();

    ctx.save();
    ctx.translate(0, -car.position.y + canvas.height * 0.667);

    road.draw(ctx);
    car.draw(ctx);

    ctx.restore();

    requestAnimationFrame(animate);
  })();
}
