/**
 * @name index.js<spec>
 * @author Masaki Sueda <sueda_masaki@cyberagent.co.jp>
 * @copyright (c) Cyberagent Inc.
 * @overview TestCase: s/beez-tab/index
 */

define(['index', 'beez'], function(index, beez) {

    beez.manager.setup();
    var mv = beez.manager.v;
    var mm = beez.manager.m;

    // create root view
    var rootView = mv.root(beez.View.extend(
        'spec.RootView',
        {
            vidx: '@',
            id: 'root',
            className: 'root',
            render: function () {
                console.log('spec.Root: render');
                $('#w').append(this.$el);
            }
        }
    ));

    // create root model
    mm.root(beez.Model.extend(
        'spec.RootModel',
        {
            midx: '@'
        }
    ));

    /*
     * @class
     */
    var TabView = index.View.extend(
        'beez.tab.view',
        {
            render: function () {
                $('#w').append(this.$el);
            },

            // override
            onChange: function (model) {
                console.log(model.toJSON());
            }
        }
    );

    beez.manager.css.async().load('/m/beez-tab/spec/index.css').end();

    var tabView, tabCollection;
    return function () {

        describe('beez-tab', function () {

            before(function (done) {
                //
                done();
            });

            it('create collection', function (done) {
                tabCollection = mm.createCollection('/@', index.Collection, [
                    {id: 'test1', label: 'tab1'},
                    {id: 'test2', label: 'tab2'},
                    {id: 'test3', label: 'tab3'}
                ]);
                done();
            });

            it('create view', function (done) {
                tabView = mv.create('/@', TabView, {
                    model: tabCollection,
                    adjust: true,
                    width : 320,
                    height: 40
                });
                rootView.async().show().then(function () {
                    done();
                }).end();
            });
        });

    };

});
