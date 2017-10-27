/**
 * Created by anhle on 10/27/17.
 */
class Point {

  constructor(long, lat){
    this.y = lat || 0;
    this.x = long || 0;
  }
}

module.exports= Point;

