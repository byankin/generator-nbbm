module.exports = function(grunt) {
  //var config = grunt.file.readJSON('config.json') || grunt.fatal('config.json not found');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      dev: {
        options: {
          paths: ['app', 'app/less']
        },
        files: {
          "app/css/main.css": "app/less/index.less"
        }
      }
    },
    jst: {
      compile: {
        options: {
          templateSettings: {
            //interpolate: /\{\{(.+?)\}\}/g
          },
          prettify: true,
          processName: function(filename) {
            return filename.replace('app/templates/', '').replace('.html', '');
          }
        },
        files: {
          "app/templates.js": [
            "app/templates/**/*.html"
          ]
        }
      }
    },
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jst');

};