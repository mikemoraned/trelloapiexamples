/*global define */
define(['ko'], function (ko) {
    'use strict';

    var Errors = function() {

        var messages = ko.observableArray();

        return {
            "messages" : messages,

            "onError" : function(error) {
                if (error) {
                    var message = error.status + ": " + error.responseText;
                    console.log(message);
                    messages.push(message);
                }
            }
        };
    };

    return Errors;
});