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
        "beez"      : "../deps/beez/release/beez"
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
