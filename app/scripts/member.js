/*global define */
define(['ko', 'trello', 'statuses'], function (ko, Trello, STATUSES) {
    'use strict';

    function Board(data) {
        this.name = ko.observable(data.name);
        this.members = ko.observable(data.memberships.length);
    }

    var Member = function(auth, errors) {
        var boards = ko.observableArray();
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

            boards: ko.computed(function() {
                if (boards().length > 4) {
                    return boards().slice(0, 4);
                }
                else {
                    return boards();
                }
            })
        };
    };

    return Member;
});