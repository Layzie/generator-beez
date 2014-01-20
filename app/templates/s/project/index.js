/**
 * @name index.js<beez-tab/s>
 * @author Masaki Sueda <sueda_masaki@cyberagent.co.jp>
 * @copyright (c) Cyberagent Inc.
 * @overview tab plug-in for Beez (browser)
 * @license MIT
 */

var BEEZ_TAB_VERSION = '0.1.0';

if (typeof module !== 'undefined' && module.exports) { // node.js: main
    exports.VERSION = BEEZ_TAB_VERSION;
} else {
    (function (global) {
        define(function (require, exports, module) {
            'use strict';

            var beez    = require('beez');
            var logger  = beez.getLogger('beez.tab');

            if (beez.tab) {
                logger.warn('beez.tab is already loaded.');
                return beez.tab;
            }

            // make it available
            beez.tab = {
                View: require('beez-tab/view/index'),
                Model: require('beez-tab/model/index').Model,
                Collection: require('beez-tab/model/index').Collection
            };

            return beez.tab;
        });
    })(this);
}
