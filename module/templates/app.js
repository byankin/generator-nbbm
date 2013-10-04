(function() {
  this.<%= _.classify(appname) %>.module("<%= appName %>", function(<%= appName %>, App, Backbone, Marionette, $, _) {
    <%= appName %>.Router = Marionette.AppRouter.extend({
      appRoutes: {

      }
    });
    
    var API = {
      
    };
    
    App.addInitializer(function() {
      return new <%= appName %>.Router({
        controller: API
      });
    });
    
    <%= appName %>.on("start", function(){
      console.log('<%= appName %> stared');
    });
  });

}).call(this);
