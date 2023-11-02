import Polygon from "./Polygon";
import getIntersection from "./getIntersection";

export default function polyIntersect(poly1: Polygon, poly2: Polygon) {
  for (let i = 0; i < poly1.vertices.length; i++) {
    for (let j = 0; j < poly2.vertices.length; j++) {
      const touch = getIntersection(
        poly1.vertices[i],
        poly1.vertices[(i + 1) % poly1.vertices.length],
        poly2.vertices[j],
        poly2.vertices[(j + 1) % poly2.vertices.length],
      );

      if (touch.offset !== 0) {
        return true;
      }
    }
  }

  return false;
}
