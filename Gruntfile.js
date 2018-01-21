module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      jsdoc : {
          dist : {
              src: ['./app/Controllers/Http/*/*.js'],
              jsdoc: './node_modules/.bin/jsdoc',
              options: {
                  destination: 'doc',
                  configure: './jsdocconf.json',
                  template: './node_modules/ink-docstrap/template'
              }
          }
      }
    });
  
    grunt.loadNpmTasks('grunt-jsdoc');
  
  };