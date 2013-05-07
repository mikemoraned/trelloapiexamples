/*global define */
define(['ko', 'trello', 'statuses'], function (ko, Trello, STATUSES) {
    'use strict';

    function Card(data) {
        this.name = ko.observable(data.name);
        this.numVotes = ko.observable(data.idMembersVoted.length);
    }

    var Voting = function(auth, errors) {
        var boardId = ko.observable(null);
        var cards = ko.observableArray();

        return {
            "findVotes" : {
                "do" : function() {
                    cards([]);
                    Trello.boards.get(boardId() + "/cards",
                        function (results) {
                            results.forEach(function(result) {
                                cards.push(new Card(result));
                            });
                        },
                        function (error) {
                            errors.onError(error);
                        }
                    );
                },

                "can" : ko.computed(function() {
                    return boardId() && boardId().length === 24 && auth.status() === STATUSES.LOGGED_IN;
                })
            },

            boardId: boardId,

            cards: ko.computed(function() {
                if (cards()) {
                    return cards().slice(0).sort(function(c1, c2) {
                        return c2.numVotes() - c1.numVotes();
                    });
                }
                else {
                    cards();
                }
            })
        };
    };

    return Voting;
});