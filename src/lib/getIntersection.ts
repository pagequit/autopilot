import Intersection from "./Intersection";
import Vector2 from "./Vector2";
import lerp from "./lerp";

export default function getIntersection(
  a: Vector2,
  b: Vector2,
  c: Vector2,
  d: Vector2,
): Intersection {
  const intersection = new Intersection(new Vector2(0, 0), 0);
  const tTop = (d.x - c.x) * (a.y - c.y) - (d.y - c.y) * (a.x - c.x);
  const uTop = (d.y - c.y) * (b.x - a.x) - (d.x - c.x) * (b.y - a.y);
  const bottom = (d.y - c.y) * (b.x - a.x) - (d.x - c.x) * (b.y - a.y);

  if (bottom !== 0) {
    const t = tTop / bottom;
    const u = uTop / bottom;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      intersection.position.x = lerp(a.x, b.x, t);
      intersection.position.y = lerp(a.y, b.y, t);
      intersection.offset = t;
    }
  }

  return intersection;
}
