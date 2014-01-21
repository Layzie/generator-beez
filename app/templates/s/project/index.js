/**
 * @name index.js<<%= slugname %>/s>
 * @author <%= props.authorName %> <<%= props.authorEmail %>>
 * @overview <%= props.description %>
 * @license <%= props.license %>
 */

var <%= versionName %> = '0.0.0';

if (typeof module !== 'undefined' && module.exports) { // node.js: main
    exports.VERSION = <%= versionName %>;
} else {
    (function (global) {
        define(function (require, exports, module) {
            'use strict';

            var beez    = require('beez');
            var logger  = beez.getLogger('<%= methodName %>');

            if (<%= methodName %>) {
                logger.warn('<%= methodName %> is already loaded.');
                return <%= methodName %>;
            }

            // make it available
            <%= methodName %> = {
                View: require('<%= slugname %>/view/index'),
                Model: require('<%= slugname %>/model/index').Model,
                Collection: require('<%= slugname %>/model/index').Collection
            };

            return <%= methodName %>;
        });
    })(this);
}
