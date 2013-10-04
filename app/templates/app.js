(function() {
  this.<%= _.classify(appname) %> = (function(Backbone, Marionette) {
    var App;
    App = new Marionette.Application;
    
    App.on("initialize:before", function(options) {

    });

    App.addRegions({
      
    });

    App.addInitializer(function() {

    });

    App.on("initialize:after", function() {
      this.startHistory();
    });
    
    App.on('start', function(){
      console.log('application started');
    })
    return App;
  })(Backbone, Marionette);

}).call(this);

$(function() {
  <%= _.classify(appname) %>.start({
    
  });
});