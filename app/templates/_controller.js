(function() {
  this.<%= _.classify(appname)%>.module("Controllers", function(Controllers, App, Backbone, Marionette, $, _) {
    Controllers.Base = Marionette.Controller.extend({
      
    });
  });

}).call(this);

