/*global define */
define(['auth'], function (Auth) {
    'use strict';

    var auth = new Auth();

    return {
        "auth": auth
    };
});