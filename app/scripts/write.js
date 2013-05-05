/*global define */
define(['ko', 'trello', 'statuses','scopes'], function (ko, Trello, STATUSES, SCOPES) {
    'use strict';

    function List(data) {
        var self = this;
        self.name = ko.observable(data.name);
        self.addCard = {
            "do" : function() {

            },

            "can" : ko.observable(true)
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
                            self.lists.push(new List(result));
                        });
                    },
                    function (error) {
                        errors.onError(error);
                    }
                );
            };
    }

    var MAX_ROWS = 8;

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
                        function (error) {
                            errors.onError(error);
                        }
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