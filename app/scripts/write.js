/*global define */
define(['ko', 'trello', 'statuses','scopes'], function (ko, Trello, STATUSES, SCOPES) {
    'use strict';

    function List(data, errors) {
        var self = this;
        self.id = data.id;

        self.name = ko.observable(data.name);

        self.cardName = ko.observable();

        self.addCard = {
            "do" : function() {
                Trello.post("cards", {
                    name: self.cardName(),
                    idList: self.id
                },
                function() {
                    console.log("Posted card");
                },
                errors.onError);
            },

            "can" : ko.computed(function() {
                return self.cardName() && self.cardName().length > 0;
            })
        };
    }

    function Board(data, errors) {
        var self = this;
        self.id = data.id;

        self.name = ko.observable(data.name);
        self.lists = ko.observableArray();
        self.selectedList = ko.observable();

        self.fetchLists = function() {
                self.lists([]);
                Trello.boards.get(this.id + "/lists",
                    function (results) {
                        results.forEach(function(result) {
                            self.lists.push(new List(result, errors));
                        });
                    },
                    errors.onError
                );
            };
    }

    var Write = function(auth, errors) {
        var boards = ko.observableArray();
        var selectedBoard = ko.observable(null);

        selectedBoard.subscribe(function(board){
            if (board) {
                board.fetchLists();
            }
        });

        return {

            "fetchBoards" : {
                "do" : function() {
                    boards([]);
                    Trello.members.get("me/boards",
                        function (results) {
                            results.forEach(function(result) {
                                boards.push(new Board(result, errors));
                            });
                        },
                        errors.onError
                    );
                },

                "can" : ko.computed(function() {
                    return auth.status() === STATUSES.LOGGED_IN;
                })
            },

            boards: boards,

            selectedBoard: selectedBoard
        };
    };

    return Write;
});