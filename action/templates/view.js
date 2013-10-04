(function() {
  this.<%= _.classify(appname)%>.module("<%= _.classify(moduleName)%>App.<%= _.classify(actionName)%>.Views", function(Views, App, Backbone, Marionette, $, _) {});
  //insert:here
}).call(this);