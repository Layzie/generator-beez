/* vim: set tabstop=2 shiftwidth=2 softtabstop=2 expandtab : */
/*global describe, beforeEach, it*/
'use strict';

var assert = require('assert');

describe('beez generator', function () {
  it('can be imported without blowing up', function () {
    var app = require('../app');
    assert(app !== undefined);
  });
});
