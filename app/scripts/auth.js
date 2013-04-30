/*global define */
define(['ko', 'trello'], function (ko, Trello) {
    'use strict';

    var LOGGED_IN = "logged in";
    var LOGGING_IN = "logging in";
    var LOGGED_OUT = "logged out";

    var status = ko.observable(LOGGED_OUT);

    var opts = {
        types: ko.observableArray(['redirect','popup']),
        'type': ko.observableArray()
    };

    return {

        "status": status,

        "passiveLogin" : function() {
            Trello.authorize({
                interactive: false,
                success: function() {
                    status(LOGGED_IN);
                },
                error: function() {
                    status(LOGGED_OUT);
                }
            });
        },

        "login" : {
            "do" : function() {
                console.log("Log in");
                status(LOGGING_IN);
                Trello.authorize({
                    name: "Basic login",
                    'type': opts.type(),
                    success: function() {
                        status(LOGGED_IN);
                    },
                    error: function() {
                        status(LOGGED_OUT);
                    }
                });
            },

            opts: opts,

            "can" : ko.computed(function() {
                return status() === LOGGED_OUT;
            })
        },

        "logout" : {
            "do" : function() {
                console.log("Log out");
                Trello.deauthorize();
                status(LOGGED_OUT);
            },

            "can" : ko.computed(function() {
                return status() === LOGGED_IN;
            })
        }
    };
});