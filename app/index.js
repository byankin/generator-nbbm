'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var NbbmGenerator = module.exports = function NbbmGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(NbbmGenerator, yeoman.generators.Base);

NbbmGenerator.prototype.askFor = function askFor() {
 /* var cb = this.async();

  // have Yeoman greet the user.
  //console.log(this.yeoman);
/*
  var prompts = [{
    name: 'appName',
    message: 'What is your application name'
  }];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;
    console.log(this.appname);
    cb();
  }.bind(this));
  */
};

NbbmGenerator.prototype.app = function app() {
  
  this.template('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('bowerrc', '.bowerrc');
  
  this.mkdir('app/apps');
  this.mkdir('app/less');
  this.mkdir('app/css');
  this.mkdir('app/templates');
  this.mkdir('app/base');
  this.mkdir('app/config');
  //this.template('index.html','app/index.html');
  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.indexFile = this.engine(this.indexFile, this);
  var vendorJS = [
    'bower_components/jquery/jquery.js',
    'bower_components/underscore/underscore.js',
    'bower_components/backbone/backbone.js',
    'bower_components/backbone.marionette/lib/backbone.marionette.js'
  ];
  this.indexFile = this.appendScripts(this.indexFile, 'scripts/vendor.js', vendorJS);
  this.write('app/index.html', this.indexFile);

};

NbbmGenerator.prototype.projectfiles = function projectfiles() {
  //this.copy('editorconfig', '.editorconfig');
  //this.copy('jshintrc', '.jshintrc');
};
