/**
 * @name index.js<<%= slugname %> specc>
 * @author <%= props.authorName %> <<%= props.authorEmail %>>
 * @fileOvermodel <%= slugname %> model
 * @overview TestCase: s/<%= slugname %>/index
 */

define(['index', 'beez'], function(index, beez) {
    return function () {
        describe('<%= slugname %>', function () {
            it('First test', function () {
                expect('ok').eq.ok;
            });
        });
    };
});
