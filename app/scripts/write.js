/*global define */
define(['ko', 'trello', 'statuses','scopes'], function (ko, Trello, STATUSES, SCOPES) {
    'use strict';

    function Board(data) {
        this.name = ko.observable(data.name);
    }

    var MAX_ROWS = 8;

    var Write = function(auth, errors) {
        var boards = ko.observableArray();
        var selectedBoard = ko.observable(null);

        var fetchBoards = function() {
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
        };

        auth.achieved.subscribe(function(scope){
           if (scope === SCOPES.WRITE) {
               fetchBoards();
           }
           else {
               boards([]);
           }
        });

        return {

            "addCard" : {
                "do" : function() {

                },

                "can" : ko.computed(function() {
                    return selectedBoard() !== null;
                })
            },

            boards: boards,

            selectedBoard: selectedBoard
        };
    };

    return Write;
});