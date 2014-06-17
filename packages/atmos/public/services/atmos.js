'use strict';

angular.module('mean.atmos').factory('Atmos', [
    function() {
        return {
            name: 'atmos'
        };
    }
]);

angular.module('mean.atmos').factory('Cities', ['$resource',
	function($resource) {
		return $resource('cities/:cityId', {
			cityId: '@_id'
		});
	}
]);
