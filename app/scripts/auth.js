/*global define */
define(['ko', 'trello'], function (ko, Trello) {
    'use strict';

    var LOGGED_IN = "logged in";
    var LOGGING_IN = "logging in";
    var LOGGED_OUT = "logged out";

    var status = ko.observable(LOGGED_OUT);

    var opts = {
        types: ko.observableArray(['redirect','popup']),
        'type': ko.observable(),
        scopes: ko.observableArray(
            [
                {
                    name: 'read-only',
                    value: { read: true, write: false, account: false }
                },
                {
                    name: 'write',
                    value: { read: true, write: true, account: false }
                },
                {
                    name: 'full',
                    value: { read: true, write: true, account: true }
                }
            ]),
        scope: ko.observable()
    };

    var Auth = function() {
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
                        scope: opts.scope().value,
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
    };

    return Auth;
});