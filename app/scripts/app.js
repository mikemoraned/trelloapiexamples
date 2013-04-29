/*global define */
define(['ko', 'trello'], function (ko, Trello) {
    'use strict';

    var LOGGED_IN = "logged in";
    var LOGGING_IN = "logging in";
    var LOGGED_OUT = "logged out";

    var status = ko.observable(LOGGED_OUT);

    return {

        "status": status,

        "login" : {
            "do" : function() {
                console.log("Log in");
                status(LOGGING_IN);

                status(LOGGED_IN);
            },

            "can" : ko.computed(function() {
                return status() === LOGGED_OUT;
            })
        },

        "logout" : {
            "do" : function() {
                console.log("Log out");
                status(LOGGED_OUT);
            },

            "can" : ko.computed(function() {
                return status() === LOGGED_IN;
            })
        }
    };
});