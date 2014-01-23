/* vim: set tabstop=2 shiftwidth=2 softtabstop=2 expandtab : */
/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('beez generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('beez:app', [
        '../../app'
      ]);
      this.app.options['skip-install'] = true;

      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    this.timeout(5000);

    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      '.jshintignore',
      'Gruntfile.js',
      'build.js',
      'package.json',
      'setver',
      'LICENSE',
      'README.md',
      's/beez-mymodule/index.js',
      's/beez-mymodule/model/index.js',
      's/beez-mymodule/view/index.js',
      'deps/beez',
      'deps/beez/s/beez/index.js',
      'spec/index.js',
      'spec/all.js',
      'spec/all.html',
      'spec/foundation/spec.js',
      'spec/require-config.js'
    ];

    helpers.mockPrompt(this.app, {
      'name': 'beez-mymodule',
      'description': 'awesome module',
      'license': 'MIT',
      'githubUsername': 'octocat',
      'authorName': 'Octo Cat',
      'authorEmail': 'octo@example.com'
    });

    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
