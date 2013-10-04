'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var NbbmGenerator = module.exports = function NbbmGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function() {
    this.installDependencies({
      skipInstall: options['skip-install'],
      callback: function() {
        this.spawnCommand('grunt', ['less','jst']);
      }.bind(this)
    });
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

  this.copy('Gruntfile.js', 'Gruntfile.js');

  this.mkdir('app/apps');
  this.mkdir('app/less');
  this.copy('index.less', 'app/less/index.less');
  this.mkdir('app/css');
  this.mkdir('app/templates');
  this.write('app/templates/dummy.html','');
  this.mkdir('app/base');
  this.mkdir('app/config');
  //this.template('index.html','app/index.html');
  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.indexFile = this.engine(this.indexFile, this);

  this.indexFile = this.appendFiles({
    html: this.indexFile,
    fileType: 'css',
    optimizedPath: 'scripts/main.js',
    sourceFileList: [
      'bower_components/normalize-css/normalize.css',
      'css/main.css',
    ]
  });

  var vendorJS = [
    'bower_components/jquery/jquery.js',
    'bower_components/underscore/underscore.js',
    'bower_components/backbone/backbone.js',
    'bower_components/backbone.marionette/lib/backbone.marionette.js'
  ];
  this.indexFile = this.appendScripts(this.indexFile, 'scripts/vendor.js', vendorJS);
  
  this.copy('config.application.js','app/config/marionette/application.js');
  this.copy('config.renderer.js','app/config/marionette/renderer.js');
  this.template('_collection.js','app/base/collection.js');
  this.template('_model.js','app/base/model.js');
  this.template('app.js','app/app.js')
  var appJS = [
    'config/marionette/application.js',
    'config/marionette/renderer.js',
    'templates.js',
    'app.js'
  ];
  
  this.indexFile = this.appendScripts(this.indexFile, 'scripts/app.js', appJS);
//  /this.indexFile = this.appendScriptsDir(this.indexFile, 'scripts/app.js', './app/base/*');

  this.write('app/index.html', this.indexFile);

};

NbbmGenerator.prototype.projectfiles = function projectfiles() {
  //this.copy('editorconfig', '.editorconfig');
  //this.copy('jshintrc', '.jshintrc');
};
