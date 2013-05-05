/*global define */
define(['ko', 'trello', 'statuses','scopes'], function (ko, Trello, STATUSES, SCOPES) {
    'use strict';

    var Auth = function(errors) {

        var opts = {
            types: ko.observableArray(['redirect','popup']),
            'type': ko.observable(null),
            scopes: ko.observableArray(
                [
                    SCOPES.READ_ONLY, SCOPES.WRITE, SCOPES.FULL
                ]),
            scope: ko.observable(SCOPES.READ_ONLY)
        };

        var status = ko.observable(STATUSES.LOGGED_OUT);

        var achievedScope = ko.observable(null);

        return {

            "status": status,

            "achieved": achievedScope,

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
                    var wantedScope = opts.scope();
                    Trello.authorize({
                        name: "Basic login",
                        'type': opts.type(),
                        scope: wantedScope.value,
                        success: function() {
                            status(STATUSES.LOGGED_IN);
                            achievedScope(wantedScope);
                        },
                        error: function() {
                            status(STATUSES.LOGGED_OUT);
                            achievedScope(null);
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
                    achievedScope(null);
                },

                "can" : ko.computed(function() {
                    return status() === STATUSES.LOGGED_IN;
                })
            }
        };
    };

    return Auth;
});