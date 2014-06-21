'use strict';

angular.module('mean.atmos').controller('TodayController', ['$scope', 'Global', 'Cities',
    function($scope, Global, Cities) {
        $scope.global = Global;
        $scope.package = {
            name: 'atmos'
        };

        $scope.init = function() {
            Cities.query(function(cities) {
                $scope.cities = cities; // FIXME refactor city/records schema
            });
        };

        $scope.selected = {
            name: '- -',
            records: [
                { atmo: '-' },
                { atmo: '-' }
            ]
        };
    }
]);
