/**
 * @name index.js<<%= slugname %>/view>
 * @author <%= props.authorName %> <<%= props.authorEmail %>>
 * @fileOverview <%= slugname %> view
 */

(function (global) {
    define(function (require, exports, module) {
        'use strict';

        var beez = require('beez');
        var logger  = beez.getLogger('<%= methodName %>.view');

        /**
         * @class
         */
        var View = View.extend(
            '<%= methodName %>.view',
            {
                vidx: '<%= methodName %>',
                /**
                 * initalize
                 * @params {String} options.prefix
                 * @params {Function} options.template
                 */
                initialize : function initialize(options) {
                    // super
                    View.__super__.initialize.apply(this, arguments);
                    // normalize
                    options = options || {};
                    /**
                     * cache options
                     * @type {Object}
                     */
                    this.options = options;

                    /**
                     * vidx
                     * {String}
                     */
                    this.vidx = options.vidx || this.vidx;
                },

                /**
                 * called before rendering once
                 */
                beforeOnce: function () {
                    View.__super__.beforeOnce.apply(this, arguments);
                },

                /**
                 * called before rendering
                 */
                before: function () {
                    View.__super__.before.apply(this, arguments);
                },

                /**
                 * called after rendering once
                 */
                afterOnce: function () {
                    View.__super__.afterOnce.apply(this, arguments);
                },

                /**
                 * callled after rendering
                 */
                after: function () {
                    View.__super__.after.apply(this, arguments);
                },
                /**
                 * dispose
                 */
                dispose: function () {
                    View.__super__.dispose.apply(this, arguments);
                }
            }
        );

        return View;
    });
})(this);
