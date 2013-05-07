require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        'jquery-migrate': '../components/jquery/jquery-migrate',
        ko: '../components/knockout/build/output/knockout-latest',
        bootstrap: 'vendor/bootstrap',
        trello: 'https://api.trello.com/1/client.js?key=afaec27e30009b0b1cfb14d85f384ee1'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        'jquery-migrate' : {
            deps: ['jquery']
        },
        trello: {
            deps: ['jquery', 'jquery-migrate'],
            exports: 'Trello'
        }
    }
});

require(['example-app', 'jquery', 'trello', 'ko', 'bootstrap'], function (app, $, Trello, ko) {
    'use strict';
    // use app here
    console.log(app);
    console.log('Running jQuery %s', $().jquery);
    console.log('Trello: %s', Trello.version());
    console.log('ko: %s', ko);

    ko.applyBindings(app);
    app.auth.passiveLogin();
});