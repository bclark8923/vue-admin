'use strict';

/* Services */
angular.module('app.services')
.factory('Session', function() {
  var session = {
    deviceID:'qj3p90fjq39r',
    city: 'San Francisco',
    location: {lat:37.75 , lon:122.68},
    start: '02-21-2014T03:14:29',
    end: '02-21-2014T03:14:45',
    interactions: [
      {time:1, object:'UIButton', page:'fvLoginController', type:'tap', buttonName:'Login'},
      {time:2, object:'UIScrollView', page:'fvFoodLogController', type:'tap'},
      {time:3, x:120, y:104, object:'UIScrollView', page:'fvFoodLogController', type:'swipeUp'},
      {time:4, x:120, y:104, object:'UIScrollView', page:'fvFoodLogController', type:'swipeDown'},
      {time:4, x:120, y:104, object:'UIScrollView', page:'fvFoodLogController', type:'swipeDown'},
      {time:4, x:120, y:104, object:'UIScrollView', page:'fvFoodLogController', type:'swipeDown'},
      {time:7, object:'UIScrollView', page:'fvMeasurementLogController', type:'tap'},
      {time:12, object:'UIScrollView', page:'fvUserController', type:'tap'},
      {time:14, object:'UIButton', page:'fvUserController', type:'tap', buttonName:'Logout'}
    ]
  };

  return session;

});
