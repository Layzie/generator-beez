/* vim: set tabstop=2 shiftwidth=2 softtabstop=2 expandtab : */
'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var BeezGenerator = module.exports = function BeezGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BeezGenerator, yeoman.generators.Base);

BeezGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'name',
    message: 'Module Name',
    default: path.basename(process.cwd()),
    validate: function (w) {
      var done = this.async();

      if (!/[a-z-]/.test(w)) {
        done('You should put lowercase alphabet in module name.');
        return;
      }

      done(true);
    },
    filter: function (w) {
      var done = this.async();

      if (!/beez-[a-z]/.test(w)) {
        done('beez-' + w);
        return;
      }

      done(w);
    }
  }, {
    name: 'description',
    message: 'Description',
    default: 'The best module ever.'
  }, {
    name: 'homepage',
    message: 'Homepage'
  }, {
    name: 'license',
    message: 'License',
    default: 'MIT'
  }, {
    name: 'githubUsername',
    message: 'GitHub username'
  }, {
    name: 'authorName',
    message: 'Author\'s Name',
    validate: function (w) {
      var done = this.async();

      if (w.length === 0) {
        done('You should put your name.');
      }

      done(true);
    },
    default: this.user.git.username
  }, {
    name: 'authorEmail',
    message: 'Author\'s Email',
    validate: function (w) {
      var done = this.async();

      if (w.length === 0) {
        done('You should put your email.');
      }

      done(true);
    },
    default: this.user.git.email
  }, {
    name: 'authorUrl',
    message: 'Author\'s Homepage'
  }];

  this.prompt(prompts, function (props) {
    this.slugname = this._.slugify(props.name);
    this.safeSlugname = this.slugname.replace(
      /-([a-z])/g,
      function (g) { return g[1].toUpperCase(); }
    );
    this.methodName = this.slugname.replace(
      /([a-z])-([a-z])/g,
      function (w) { return w[0] + '.' + w[2]; }
    );
    this.versionName = this.slugname.replace(
      /(beez)-([a-z]+)/g,
      function (w, p1, p2, offset, s) {
        return p1.toUpperCase() + '_' + p2.toUpperCase() + '_VERSION';
      }
    );

    if (props.githubUsername) {
      this.repoUrl = 'https://github.com/' + props.githubUsername + '/' + this.slugname;
    } else {
      this.repoUrl = 'user/repo';
    }

    if (!props.homepage) {
      props.homepage = this.repoUrl;
    }

    this.props = props;

    cb();
  }.bind(this));
};

BeezGenerator.prototype.app = function app() {
  this.mkdir('s');
  this.mkdir('s/' + this.slugname);
  this.mkdir('s/' + this.slugname + '/model');
  this.mkdir('s/' + this.slugname + '/view');

  this.template('s/project/index.js', 's/' + this.slugname + '/index.js');
  this.template('s/project/model/index.js', 's/' + this.slugname + '/model/index.js');
  this.template('s/project/view/index.js', 's/' + this.slugname + '/view/index.js');

  this.bulkDirectory('deps', 'deps', function () {
    console.log('beez directory has been copied.');
  });

  this.bulkDirectory('spec', 'spec', function () {
    console.log('spec directory has been copied.');
  });

  this.template('require-config.js', 'spec/require-config.js');
  this.template('spec-index.js', 'spec/index.js');
};

BeezGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('jshintrc', '.jshintrc');
  this.copy('jshintignore', '.jshintignore');
  if (this.props.license === 'MIT') {
    this.copy('LICENSE');
  }
  this.template('Gruntfile.js');
  this.template('_package.json', 'package.json');
  this.template('setver');
  this.template('README.md');
};
