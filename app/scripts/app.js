/*global define */
define(['ko'], function (ko) {
    'use strict';

    var loggedIn = ko.observable(false);

    return {

        "login" : {
            "do" : function() {
                console.log("Log in");
                loggedIn(true);
            },

            "can" : ko.computed(function() {
                return !loggedIn();
            })
        },

        "logout" : {
            "do" : function() {
                console.log("Log out");
                loggedIn(false);
            },

            "can" : ko.computed(function() {
                return loggedIn();
            })
        }
    };
});