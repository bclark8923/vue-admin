'use strict';

/* Directives */
angular.module('app.directives', [])
.directive('vectorMap', function() {

  return {
    restrict: 'AE',
    replace: false,
    scope: {
      data: '=countries'
    },
    link: function(scope, element, attrs) {

      function renderVectorMap() {
        element.vectorMap({
          map: 'world_mill_en',
          backgroundColor: '#fff',
          regionStyle: {
            initial: {
              fill: '#c4c4c4'
            },
            hover: {
              'fill-opacity': 1
            }
          },
          series: {
            regions: [{
              values: scope.data,
              scale: ['#85a8b6', '#4d7686'],
              normalizeFunction: 'polynomial'
            }]
          },
          onRegionLabelShow: function(event, el, code) {
            if (angular.isUndefined(scope.data[code])) {
              event.preventDefault();
            } else {
              var countrylbl = scope.data[code];
              el.html(el.html() + ': ' + countrylbl + ' visits');
            }
          }
        });
      }

      scope.$watch('data', renderVectorMap);
    }
  };

});
