'use strict';

angular.module('mean.atmos').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('atmos', {
            url: '/atmos',
            templateUrl: 'atmos/views/index.html'
        });
    }
]);
