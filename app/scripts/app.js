/*global define */
define(['auth','errors','member'], function (Auth, Errors, Member) {
    'use strict';

    var errors = new Errors();
    var auth = new Auth(errors);
    var member = new Member(auth, errors);

    return {
        "auth": auth,
        "member" : member
    };
});