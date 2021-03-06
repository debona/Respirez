'use strict';

angular.module('mean.atmos').controller('TodayController', ['$scope', '$cookies', 'Global', 'Cities',
    function($scope, $cookies, Global, Cities) {

        $scope.selected = {
            name: '\u00A0',
            records: [
                { atmo: '\u00A0' },
                { atmo: '\u00A0' }
            ]
        };

        $scope.init = function() {
            Cities.query(function(cities) {
                $scope.cities = cities; // FIXME refactor city/records schema

                var cityToDisplay = $cookies.lastSelectedCityName || 'paris';
                $scope.cities.forEach(function(city) {
                    if (city.name === cityToDisplay)
                        $scope.selected = city;
                });
            });
        };

        $scope.select = function todaySelect(selected) {
            $scope.selected = selected;
            $cookies.lastSelectedCityName = selected.name;
        };
    }
]);
