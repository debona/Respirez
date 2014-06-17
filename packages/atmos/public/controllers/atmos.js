'use strict';

angular.module('mean.atmos').controller('AtmosController', ['$scope', 'Global', 'Atmos',
    function($scope, Global, Atmos) {
        $scope.global = Global;
        $scope.package = {
            name: 'atmos'
        };

        $scope.cities = [
            {'name': 'paris'},
            {'name': 'marseille'},
            {'name': 'lyon'},
            {'name': 'toulouse'},
            {'name': 'nice'},
            {'name': 'nantes'},
            {'name': 'strasbourg'},
            {'name': 'montpellier'},
            {'name': 'bordeaux'},
            {'name': 'lille'},
        ];
    }
]);
