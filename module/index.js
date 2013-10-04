'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var backboneUtils = require('../util.js');

var ModuleGenerator = module.exports = function ModuleGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  //console.log('You called the module subgenerator with the argument ' + this.name + '.');
};

util.inherits(ModuleGenerator, yeoman.generators.NamedBase);

ModuleGenerator.prototype.files = function files() {
  //this.copy('somefile.js', 'somefile.js');
  this.appName = this._.classify(this.name)+'App';
  var scriptName = 'apps/'+this._.slugify(this.name)+'/'+this._.slugify(this.name)+'_app.js'
  this.template('app.js', 'app/'+scriptName);
  backboneUtils.rewriteFile({
      file: 'app/index.html',
      needle: '<!-- endbuild -->',
      splicable: [
        '<script src="' + scriptName +'"></script>'
      ]
    });
};
