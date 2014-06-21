'use strict';

angular.module('mean.atmos').filter('capitalize', function() {
    return function capitalize(string) {
        if (!string)
            return string;
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
});
