/**
 * @name index.js<beez-tab/model>
 * @author Masaki Sueda <sueda_masaki@cyberagent.co.jp>
 * @fileOverview tab model
 */

(function (global) {
    define(function (require, exports, module) {
        'use strict';

        var beez = require('beez');
        var logger = beez.getLogger('beez.tab.model');

        require('beez.touch');

        var TabModel = beez.Model.extend(
            'beez.tab.model',
            {
                midx: 'tab',

                defaults: {
                    /**
                     * id
                     * @type {String}
                     */
                    id: 'none',
                    /**
                     * is selected
                     * @type {Boolean}
                     */
                    selected: false,

                    /**
                     * is disable
                     * @type {Boolean}
                     */
                    disable: false,

                    /**
                     * label 
                     * @type {String}
                     */
                    label: 'no text'
                }
            }
        );

        var TabCollection = beez.Collection.extend(
            'beez.tab.collection',
            {
                midx: 'tabs',

                update: function (model) {

                    this.each(function (model) {
                        model.set({selected: false}, {silent: true});
                    });
                    model.set({selected: true});

                }
            }
        );

        return {
            Model: TabModel,
            Collection: TabCollection
        };
    });
})(this);
