'use strict';

angular.module('mean.atmos').controller('AtmosController', ['$scope', 'Global', 'Cities',
    function($scope, Global, Cities) {
        $scope.global = Global;
        $scope.package = {
            name: 'atmos'
        };

        $scope.find = function() {
            Cities.query(function(cities) {
                $scope.cities = cities;
            });
        };
    }
]);
