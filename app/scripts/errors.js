/*global define */
define([], function () {
    'use strict';

    var Errors = function() {

        return {
            "onError" : function(error) {
                console.log(error);
            }
        };
    };

    return Errors;
});