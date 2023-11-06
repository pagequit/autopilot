/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import Car from "./Car";
import KeyboardControls from "./KeyboardControls";
import Road from "./Road";
import Sensor from "./Sensor";
import Polygon from "./lib/Polygon";
import Vector2 from "./lib/Vector2";
import polyIntersect from "./lib/polyIntersect";

export default function main() {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  canvas.height = window.innerHeight;
  canvas.width = 200;

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const road = new Road(canvas.width / 2, canvas.width - 10, 3);
  const car = new Car(
    new Vector2(
      road.getLaneCenter(Math.floor(road.laneCount / 2)),
      canvas.height / 2,
    ),
    30,
    50,
    new KeyboardControls(),
  );
  const sensor = new Sensor(car.position, car.angle);

  const dummyControls = {
    up: false,
    down: false,
    left: false,
    right: false,
  };

  const trafic = [
    new Car(
      new Vector2(road.getLaneCenter(2), 100),
      30,
      50,
      dummyControls,
      0.2,
    ),
    // new Car(
    //   new Vector2(road.getLaneCenter(0), 100),
    //   30,
    //   50,
    //   dummyControls,
    //   2.4,
    // ),
  ];

  function processPhysics(polygons: Array<Polygon>) {
    for (let i = 0; i < polygons.length; i++) {
      const currentPoly = polygons[i];
      const nextPoly = polygons[i + 1];
      if (nextPoly && polyIntersect(currentPoly, nextPoly)) {
        currentPoly.collide(nextPoly);
        nextPoly.collide(currentPoly);
      }
    }
  }

  let now = Date.now();
  let then = Date.now();

  (function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(0, -car.position.y + canvas.height * 0.667);

    road.draw(ctx);

    // for (const car of trafic) {
    //   car.update();
    //   car.draw(ctx);
    // }

    car.update();
    car.draw(ctx);

    processPhysics([
      car.polygon,
      road.polygon,
      // ...trafic.map((car) => car.polygon),
    ]);

    sensor.update([
      road.polygon,
      // ...trafic.map((car) => car.polygon),
    ]);
    sensor.draw(ctx);

    ctx.restore();

    ctx.beginPath();
    ctx.strokeStyle = "darkgrey";
    ctx.setLineDash([2, 2]);

    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    ctx.setLineDash([]);

    then = now;
    now = Date.now();
    const delta = now - then;
    ctx.fillText("FPS: " + Math.round(1000 / delta), 10, 10);
    requestAnimationFrame(animate);
  })();
}
