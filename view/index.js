'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');
var path = require('path');
var backboneUtils = require('../util.js');
var glob = require("glob");
var ViewGenerator = module.exports = function ViewGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.Base.apply(this, arguments);

  //console.log('You called the view subgenerator with the argument ' + this.name + '.');
};

util.inherits(ViewGenerator, yeoman.generators.NamedBase);

ViewGenerator.prototype.askFor = function askFor() {
   var cb = this.async();
   var modules = fs.readdirSync('app/apps');
   var results = [];
   var classify = this._.classify
   this._.forEach(modules, function(module, index){
     results[index] = classify(module);
   });
   var views = [];
   var files = glob.sync("app/apps/**/*.js");
   this._.forEach(files, function(file){
     var string = this.readFileAsString(file);
     var result = string.match(/.*App\.Views.*/gm);
     if (result){
       this._.forEach(result, function(view){
         view = view.split('=');
         view = this._.trim(view[0]);
         path = file.split('/');
         view = path[2]+'/'+path[3]+'/'+view;
         views.push(view);
       },this);
     }
     
//     /console.log(result);
   }, this);
   //this.readFileAsString(path.join(this.sourceRoot(), 'view.js'));
     // console.log(files);
    
   //modules = this._.invoke(modules, classify);
   var prompts = [/*{
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
   },*/{
     type: 'list',
     name: 'viewType',
     message: 'Choose view type:',
     choices: [
       'Layout',
       'ItemView',
       'CollectionView',
       'CompositeView'
     ]
     
   },{
     when: function(pros){
       if (pros.viewType === 'CollectionView' || pros.viewType === 'CompositeView'){
         return true;
       }
     },
     type: 'list',
     name:'itemView',
     message: 'Select item view:',
     choices: views
   },{
     name:'viewName',
     message: 'Enter view name:',
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
     this.moduleName = 'Header';//props.moduleName;
     this.actionName = 'list';//props.actionName;
     this.viewName = props.viewName;
     this.viewType = props.viewType;
    
    cb();
   }.bind(this));
   
};

ViewGenerator.prototype.files = function files() {
  this.viewFile = this.readFileAsString(path.join(this.sourceRoot(), 'view.js'));
  this.viewFile = this.engine(this.viewFile, this);
  console.log(this.viewFile);
  var viewName = 'apps/'+this._.slugify(this.moduleName)+'/'+ this._.slugify(this.actionName)+'/'+ this._.slugify(this.actionName) + '_view.js';
  backboneUtils.rewriteFile({
      file: 'app/'+viewName,
      needle: '//insert:here',
      splicable: [
        this.viewFile
      ]
    });
};
