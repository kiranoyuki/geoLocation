/**
 * Created by anhle on 10/27/17.
 */
const stateObject = require('./resources/states.json');
//const stateObject = require('./resources/test.json');
const State = require('./state');

class LocationData {

  constructor(){
    this.locations = stateObject;
    this.stateTable = this.initTable();

  }

  /**
   * function to pre-process the state.json
   * the table will store the state name and the max, min latitude and longitude of the state
   * @returns {}
   */
  initTable(){
    var table = {};
    this.locations.forEach((obj) => {
      var state = new State(obj.state, obj.border);
      table[obj.state] = state;
    });
    return table;

  }

  /**
   * return the list of states that contains point
   * @param point
   * @returns {Array}
   */
  getStates(point){
    var res = [];
    const states = Object.keys(this.stateTable);
    for(let name of states){
      if(this.stateTable[name].containPoint(point)){
        res.push(name);
      }
    }

    return res;
  }



}

module.exports= LocationData;

