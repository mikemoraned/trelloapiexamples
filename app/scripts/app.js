/*global define */
define(['auth','errors','member','write'], function (Auth, Errors, Member, Write) {
    'use strict';

    var errors = new Errors();
    var auth = new Auth(errors);
    var member = new Member(auth, errors);
    var write = new Write(auth, errors);

    return {
        "auth"   : auth,
        "member" : member,
        "write"  : write
    };
});