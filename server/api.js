/**
 * Created by anhle on 10/27/17.
 */

const express = require('express');
const router = express.Router();
const LocationData = require('./locations');
const Point = require('./point');

const prepData = new LocationData();



router.get('/states', function (req, res) {

  let longitude = Number(req.query.longitude);
  let latitude = Number(req.query.latitude);

  if( !isNaN(longitude) && !isNaN(latitude)){
    res.status(200).send(prepData.getStates( new Point(longitude, latitude)));
  } else {
    res.status(400).send("Invalid input number");
  }


});

module.exports = router;
