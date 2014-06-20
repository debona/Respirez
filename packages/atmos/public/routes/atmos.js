'use strict';

angular.module('mean.atmos').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('Aujourd\'hui', {
            url: '/today',
            templateUrl: 'atmos/views/today.html'
        });
    }
]);
