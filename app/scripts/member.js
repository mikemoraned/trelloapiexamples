/*global define */
define(['ko', 'trello', 'statuses'], function (ko, Trello, STATUSES) {
    'use strict';

    function Board(data) {
        this.name = ko.observable(data.name);
        this.members = ko.observable(data.memberships.length);
    }

    function Action(data) {
        this.name = ko.observable(data.type);
    }

    var MAX_ROWS = 8;

    var Member = function(auth, errors) {
        var boards = ko.observableArray();
        var actions = ko.observableArray();
        return {
            "fetchBoards" : {
                "do" : function() {
                    boards([]);
                    Trello.members.get("me/boards",
                        function (results) {
                            results.forEach(function(result) {
                                boards.push(new Board(result));
                            });
                        },
                        function (error) {
                            errors.onError(error);
                        }
                    );
                },

                "can" : ko.computed(function() {
                    return auth.status() === STATUSES.LOGGED_IN;
                })
            },

            "fetchActions" : {
                "do" : function() {
                    actions([]);
                    Trello.members.get("me/actions",
                        function (results) {
                            results.forEach(function(result) {
                                actions.push(new Action(result));
                            });
                        },
                        function (error) {
                            errors.onError(error);
                        }
                    );
                },

                "can" : ko.computed(function() {
                    return auth.status() === STATUSES.LOGGED_IN;
                })
            },

            boards: ko.computed(function() {
                if (boards().length > MAX_ROWS) {
                    return boards().slice(0, MAX_ROWS);
                }
                else {
                    return boards();
                }
            }),

            actions: ko.computed(function() {
                if (actions().length > MAX_ROWS) {
                    return actions().slice(0, MAX_ROWS);
                }
                else {
                    return actions();
                }
            })
        };
    };

    return Member;
});