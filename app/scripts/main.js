require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        'jquery-migrate': '../components/jquery/jquery-migrate',
        bootstrap: 'vendor/bootstrap',
        trello: 'https://api.trello.com/1/client.js?key=afaec27e30009b0b1cfb14d85f384ee1'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        trello: {
            deps: ['jquery', 'jquery-migrate'],
            exports: 'Trello'
        }
    }
});

require(['app', 'jquery', 'trello', 'bootstrap'], function (app, $, Trello) {
    'use strict';
    // use app here
    console.log(app);
    console.log('Running jQuery %s', $().jquery);
    console.log('Trello: %s', Trello);
});