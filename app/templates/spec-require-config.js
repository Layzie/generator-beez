(function(global) {
    var require = global.require;

    // Configure RequireJS
    require.config({
        'baseUrl': '/m/<%= slugname %>/s',
        'urlArgs': 'v=' + (new Date()).getTime(),
        'paths': {
            'mocha': '/m/<%= slugname %>/node_modules/mocha/mocha',
            'chai': '/m/<%= slugname %>/node_modules/chai/chai',
            'backbone': '/m/<%= slugname %>/deps/beez/vendor/backbone',
            'underscore': '/m/<%= slugname %>/deps/beez/vendor/underscore',
            'zepto': '/m/<%= slugname %>/deps/beez/vendor/zepto',
            'handlebars': '/m/<%= slugname %>/deps/beez/vendor/handlebars.runtime',
            'beez': '/m/<%= slugname %>/deps/beez/release/beez',
            'index': '/m/<%= slugname %>/s/<%= slugname %>/index',
            'spec': '/m/<%= slugname %>/spec'
        },
        'shim': {
            'backbone': {
                'deps': [
                    'underscore',
                    'zepto'
                ],
                'exports': 'Backbone'
            },
            'zepto': {
                'exports': '$'
            },
            'underscore': {
                'exports': '_'
            },
            'handlebars': {
                'exports': 'Handlebars'
            }
        },
        'config': {
        }
    });

    // Require libraries
    require(['require', 'chai', 'mocha'], function (require, chai, mocha) {
        // Chai
        global.assert = chai.assert;
        //global.should = chai.should();
        global.expect = chai.expect;

        // Mocha
        global.mocha.setup({
            ui: 'bdd',
            timeout: 10 * 1000
        });
        var spec = global.spec;

        spec.rerun = function rerun() {
            if (!spec.TestCaseName) {
                return;
            }
            //var suite = require(['spec/' + el.getAttribute('data-name')]);
            // Require base tests before starting
            require(['spec/' + spec.TestCaseName], function (suite) {
                // Start runner
                global.mocha.suite.suites = []; // clear
                suite();
                var runner = global.mocha.run();
                runner.globals([
                    '_zid' // Backbone.history
                ]);
            });
        };

    });
})(this);
