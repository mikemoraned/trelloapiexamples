/*global define */
define([], function () {
    'use strict';

    return {
        READ_ONLY  : {
            name: 'read-only',
            value: { read: true, write: false, account: false }
        },
        WRITE : {
            name: 'write',
            value: { read: true, write: true, account: false }
        },
        FULL : {
            name: 'full',
            value: { read: true, write: true, account: true }
        }
    };
});