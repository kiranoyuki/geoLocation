/**
 * Created by anhle on 10/27/17.
 */
const Point = require('./point');

class State{

  constructor(name, border){
    this.name = name;
    this.border = border;
    this.maxMin = this.prepData(border);

  }

  /**
   * this function extract the max, min lat and long of each state
   * @param border
   */
  prepData(border) {
    let maxPoint = new Point(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
    let minPoint = new Point(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);

    border.forEach(point => {
      maxPoint.y = Math.max(point[1], maxPoint.y);
      maxPoint.x = Math.max(point[0], maxPoint.x);
      minPoint.y = Math.min(point[1], minPoint.y);
      minPoint.x = Math.min(point[0], minPoint.x);
    });


    return [maxPoint, minPoint];
  }

  /**
   * function to check if a point is belong in a state
   * using the clipping method (computer graphic) to check if point is inside a polygon
   * 1) Draw a horizontal line to the right of each point and extend it to infinity
   * 2) Count the number of times the line intersects with polygon edges.
   * 3) A point is inside the polygon if either count of intersections is odd or
        point lies on an edge of polygon.  If none of the conditions is true, then
        point lies outside.
   * @param point
   * @returns {boolean}
   */
  containPoint(point){

    if(!this.isInBorder(point))
      return false;

    let count= 0;
    for(let i=0; i<this.border.length; i++) {

      let p1= this.border[i];
      let p2 = this.border[(i+1) % this.border.length];

      p1 = new Point(p1[0], p1[1]);
      p2 = new Point(p2[0], p2[1]);

      let start = (p1.x < p2.x) ? p1 : p2;
      let end = (p1.x < p2.x) ? p2 : p1;

      if(start.x == end.x && point.x == start.x) {
        let down = Math.min(start.y, end.y);
        let top = Math.max(start.y, end.y);

        if(down <= point.y && point.y <= top)
          return true;
      } else if( (start.x <= point.x) && (point.x < end.x) ) {
        let y = (end.y-start.y) * (point.x-start.x) / (end.x-start.x) + start.y;

        if(point.y == y){
          return true;
        } else if(point.y < y){
          count++;
        }
      }
    }

    return count % 2 == 1;

  }

  /**
   * quick check if point is inside border
   * return true if point is inside max-min lat and long
   * @param point
   * @returns {boolean}
   */
  isInBorder(point){

    if((point.y <= this.maxMin[0].y && point.y >= this.maxMin[1].y) &&
      (point.x <= this.maxMin[0].x && point.x >= this.maxMin[1].x)){
      return true;
    }
    return false;
  }


}

module.exports = State;
