/*global define */
define(['ko', 'trello', 'statuses'], function (ko, Trello, STATUSES) {
    'use strict';

    var Auth = function(errors) {

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

        var status = ko.observable(STATUSES.LOGGED_OUT);

        return {

            "status": status,

            "passiveLogin" : function() {
                Trello.authorize({
                    interactive: false,
                    success: function() {
                        status(STATUSES.LOGGED_IN);
                    },
                    error: function(error) {
                        status(STATUSES.LOGGED_OUT);
                        errors.onError(error);
                    }
                });
            },

            "login" : {
                "do" : function() {
                    console.log("Log in");
                    status(STATUSES.LOGGING_IN);
                    Trello.authorize({
                        name: "Basic login",
                        'type': opts.type(),
                        scope: opts.scope().value,
                        success: function() {
                            status(STATUSES.LOGGED_IN);
                        },
                        error: function() {
                            status(STATUSES.LOGGED_OUT);
                        }
                    });
                },

                opts: opts,

                "can" : ko.computed(function() {
                    return status() === STATUSES.LOGGED_OUT;
                })
            },

            "logout" : {
                "do" : function() {
                    console.log("Log out");
                    Trello.deauthorize();
                    status(STATUSES.LOGGED_OUT);
                },

                "can" : ko.computed(function() {
                    return status() === STATUSES.LOGGED_IN;
                })
            }
        };
    };

    return Auth;
});