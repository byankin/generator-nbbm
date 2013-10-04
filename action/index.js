'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ActionGenerator = module.exports = function ActionGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the action subgenerator with the argument ' + this.name + '.');
};

util.inherits(ActionGenerator, yeoman.generators.NamedBase);

ActionGenerator.prototype.files = function files() {
  this.copy('somefile.js', 'somefile.js');
};
