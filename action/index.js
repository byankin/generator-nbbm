'use strict';
var util = require('util');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var backboneUtils = require('../util.js');

var ActionGenerator = module.exports = function ActionGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  //console.log('You called the action subgenerator with the argument ' + this.name + '.');
};

util.inherits(ActionGenerator, yeoman.generators.NamedBase);

ActionGenerator.prototype.askFor = function askFor() {
   var cb = this.async();
   var modules = fs.readdirSync('app/apps');
   var results = [];
   var classify = this._.classify
   this._.forEach(modules, function(module, index){
     results[index] = classify(module);
   });
   
   //modules = this._.invoke(modules, classify);
   var prompts = [{
     type: 'list',
     name: 'moduleName',
     message: 'Choose module:',
     choices: results
   },{
     name : 'actionName',
     message: 'Action name:',
     validate: function(input){
       if (!input) {
         return false;
       }
       else {
         return true;
       }
     }
   }];
   
   this.prompt(prompts, function (props) {
     this.moduleName = props.moduleName;
     this.actionName = props.actionName;
    
    cb();
   }.bind(this));
   
};

ActionGenerator.prototype.files = function files() {
  var controllerName = 'apps/'+this._.slugify(this.moduleName)+'/'+ this._.slugify(this.actionName)+'/'+ this._.slugify(this.actionName) + '_controller.js';
  this.template ('controller.js','app/'+ controllerName);
  backboneUtils.rewriteFile({
      file: 'app/index.html',
      needle: '<!-- endbuild -->',
      splicable: [
        '<script src="' + controllerName +'"></script>'
      ]
    });
  var viewName = 'apps/'+this._.slugify(this.moduleName)+'/'+ this._.slugify(this.actionName)+'/'+ this._.slugify(this.actionName) + '_view.js';
  this.template ('view.js','app/'+ viewName);
  backboneUtils.rewriteFile({
      file: 'app/index.html',
      needle: '<!-- endbuild -->',
      splicable: [
        '<script src="' + viewName +'"></script>'
      ]
    });
};
