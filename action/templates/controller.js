(function() {
  this.<%= _.classify(appname)%>.module("<%= _.classify(moduleName)%>App.<%= _.classify(actionName)%>", function(<%= _.classify(actionName)%>, App, Backbone, Marionette, $, _) {
    <%= _.classify(actionName)%>.Controller = App.Controllers.Base.extend({
      initialize: function(){
        console.log('<%= _.classify(actionName)%> initialize');
      }
    });
      
  });
}).call(this);

