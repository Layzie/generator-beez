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
      default: path.basename(process.cwd())
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
      message: 'Author\'s Name'
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email'
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
  var ignores = [
    '.git',
    'LICENSE.md'
  ];

  this.mkdir('deps');
  this.mkdir('vender');
  this.mkdir('spec');
  this.mkdir('deps');
  this.mkdir('s');
  this.mkdir('s/' + this.slugname);
  this.mkdir('s/' + this.slugname + '/model');
  this.mkdir('s/' + this.slugname + '/view');
  this.template('s/project/index.js', 's/' + this.slugname + '/index.js');
  this.template('s/project/model/index.js', 's/' + this.slugname + '/model/index.js');
  this.template('s/project/view/index.js', 's/' + this.slugname + '/view/index.js');

  // this.expandFiles('*', {
  //   cwd: this.sourceRoot(),
  //   dot: true
  // }).forEach(function (el) {
  //   if (ignores.indexOf(el) === -1) {
  //     this.copy(el, el);
  //   }
  // }, this);
};

BeezGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('jshintrc', '.jshintrc');
  this.copy('jshintignore', '.jshintignore');
  this.template('_package.json', 'package.json');
  this.template('setver');
};
