({
    appDir: "./s",
    baseUrl: ".",
    dir: "./dist",
    optimize: "none",
    //optimize: "uglify2",

    paths: {
        "zepto"     : "../deps/beez/vendor/zepto",
        "backbone"  : "../deps/beez/vendor/backbone",
        "underscore": "../deps/beez/vendor/underscore",
        "handlebars": "../deps/beez/vendor/handlebars.runtime",
        "sasuke"    : "../deps/sasuke.js/release/sasuke",
        "beez"      : "../deps/beez/release/beez",
        "beez.touch" : "../deps/beez-touch/release/beez.touch",
        "beez.tab" : "./beez-tab/index"
    },

    shim: {
        zepto: {
            exports: "$"
        },
        backbone: {
            deps: ["underscore", "zepto"],
            exports: "Backbone"
        },
        underscore: {
            exports: "_"
        },
        handlebars: {
            exports: "Handlebars"
        }
    },

    modules: [
        {
            name: "beez.tab",
            exclude: [
                "zepto",
                "backbone",
                "underscore",
                "handlebars",
                "beez",
                "beez.touch"
            ]
        }
    ]
})
