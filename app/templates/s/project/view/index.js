/**
 * @name index.js<beez-tab/view>
 * @author Masaki Sueda <sueda_masaki@cyberagent.co.jp>
 * @fileOverview tab view
 */

(function (global) {
    define(function (require, exports, module) {
        'use strict';

        var beez = require('beez');
        var logger = beez.getLogger('beez.scroll.view');

        require('beez.touch');

        /**
         * @class
         */
        var TabView = beez.touch.View.extend(
            'beez.tab.view',
            {
                vidx: 'tab',
                /**
                 * プレフィックスをclassに反映するためにconstructorをoverrideしています
                 * constructor of the view
                 * @param  {*} options
                 */
                constructor: function (mng, options) {
                    options = options || {};

                    /**
                     * base prefix
                     * @type {String}
                     */
                    this._PREFIX = options.prefix || 'bztb';

                    /**
                     * class name
                     * @type {String}
                     */
                    this.className = (this.className && this.className + ' ' || '') + this._PREFIX + '-tabs';

                    // super
                    TabView.__super__.constructor.apply(this, arguments);
                },


                /**
                 * initalize
                 * @params {String} options.prefix
                 * @params {Function} options.template
                 */
                initialize : function initialize(options) {
                    // super
                    TabView.__super__.initialize.apply(this, arguments);
                    // normalize
                    options = options || {};
                    options.className = options.className || {};
                    /**
                     * cache options
                     * @type {Object}
                     */
                    this.options = options;

                    /**
                     * width
                     * @type {Number}
                     */
                    this._width = options.width || 'auto';

                    /**
                     * height
                     * @type {Number}
                     */
                    this._height = options.height || 'auto';

                    /**
                     * auto adjust mode
                     * @type {Boolean}
                     */
                    this._adjust = options.adjust || false;

                    /**
                     * class names
                     * {String}
                     */
                    this._CLASSNAME_DISABLE = options.className.disable || 'disable';
                    this._CLASSNAME_SELECTED = options.className.selected || 'selected';

                    /**
                     * vidx
                     * {String}
                     */
                    this.vidx = options.vidx || this.vidx;

                    /**
                     * handlebars template
                     * @type {Function}
                     */
                    this._template = options.template;
                },

                /**
                 * called before rendering once
                 */
                beforeOnce: function () {
                    TabView.__super__.beforeOnce.apply(this, arguments);

                    this.getParent().$el.append(this.$el);
                },

                /**
                 * callled after rendering
                 */
                after: function () {
                    TabView.__super__.after.apply(this, arguments);

                    this._setEvents();
                    this._onUpdate();
                },

                /**
                 * resize
                 * @param  {Number} width
                 * @param  {Number} height
                 */
                resize: function (width, height) {
                    this.$el.css({
                        width: width || this._width,
                        height: height || this._height
                    });
                    this._width = width;
                    this._height = height;
                },

                /**
                 * set events
                 * @private
                 */
                _setEvents: function _setEvents() {

                    this.listenTo(this.model, 'change', this._onUpdate);
                    this.listenTo(this.model, 'add', this._onAdd);
                    this.listenTo(this.model, 'remove', this._onUpdate);

                },

                /**
                 * update handler
                 * @private
                 * @param  {beez.tab.model} model
                 */
                _onUpdate : function _onUpdate() {

                    this.$el.html('');
                    this.model.each(function (model) {
                        this._onAdd(model);
                    }, this);

                },

                /**
                 * add handler
                 * @private
                 * @param  {beez.tab.model} model
                 */
                _onAdd : function _onAdd(model) {
                    var data = model.toJSON();
                    var $tab;
                    if (this._template) {
                        $tab = $(this._template(data), {
                            class : this._PREFIX + '-tab',
                        });
                    } else {
                        $tab = $('<div />', {
                            class : this._PREFIX + '-tab',
                            text : data.label
                        });
                    }

                    if (data.disable) {
                        $tab.addClass(this._CLASSNAME_DISABLE);
                    }
                    if (data.selected) {
                        $tab.addClass(this._CLASSNAME_SELECTED);
                    }

                    // tap events
                    this.tap($tab, function (e) {
                        e.stopPropagation();
                        this._onTap(e);
                    }, this);

                    this.$el.append($tab);
                },

                /**
                 * OVERRIDE ME
                 * @param  {beez.tab.model} model
                 */
                onChange: function onChange(model) {
                },

                /**
                 * tap handler
                 * @private
                 */
                _onTap : function _onTap(e) {
                    logger.trace('on tap');
                    var index = this.$el.find('.' + this._PREFIX + '-tab').index($(e.currentTarget));
                    var model = this.model.at(index);
                    if (model.get('disable')) {
                        return;
                    }
                    this.model.update(model);
                },

                /**
                 * touch handler
                 * @param {*} e event object
                 */
                _onTouchStart : function _onTouchStart(e) {
                    logger.trace('on touch start');
                    //
                },

                /**
                 * touch end handler
                 */
                _onTouchEnd : function _onTouchEnd(e) {
                    logger.trace('on touch end');
                    //
                },

                /**
                 * dispose
                 */
                dispose: function () {
                    TabView.__super__.dispose.apply(this, arguments);
                }
            }
        );

        return TabView;
    });
})(this);
