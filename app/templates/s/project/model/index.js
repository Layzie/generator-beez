/**
 * @name index.js<<%= slugname %>/model>
 * @author <%= props.authorName %> <<%= props.authorEmail %>>
 * @fileOvermodel <%= slugname %> model
 */

(function (global) {
    define(function (require, exports, module) {
        'use strict';

        var beez = require('beez');
        var logger  = beez.getLogger('<%= methodName %>.model');

        var Model = beez.Model.extend(
            '<%= methodName %>.model',
            {
                midx: '<%= methodName %>',
                /**
                 * initalize
                 * @params {String} options.prefix
                 * @params {Function} options.template
                 */
                initialize : function initialize(options) {
                    // super
                    Collection.__super__.initialize.apply(this, arguments);
                    // normalize
                    options = options || {};
                    /**
                     * cache options
                     * @type {Object}
                     */
                    this.options = options;

                    /**
                     * midx
                     * {String}
                     */
                    this.midx = options.midx || this.midx;
                }
            }
        );

        var Collection = beez.Collection.extend(
            '<%= methodName %>.collection',
            {
                midx: '<%= methodName %>s',
                /**
                 * initalize
                 * @params {String} options.prefix
                 * @params {Function} options.template
                 */
                initialize : function initialize(options) {
                    // super
                    Collection.__super__.initialize.apply(this, arguments);
                    // normalize
                    options = options || {};
                    /**
                     * cache options
                     * @type {Object}
                     */
                    this.options = options;

                    /**
                     * midx
                     * {String}
                     */
                    this.midx = options.midx || this.midx;
                }
            }
        );

        return {
            Model: Model,
            Collection: Collection
        };
    });
})(this);
