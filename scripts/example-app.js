/*global define */
define(['auth','errors','voting'], function (Auth, Errors, Voting) {
    'use strict';

    var errors = new Errors();
    var auth = new Auth(errors);
    var voting = new Voting(auth, errors);

    return {
        "auth"   : auth,
        "errors" : errors,
        "voting" : voting
    };
});