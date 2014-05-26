'use strict';

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({

    bowerRelease: {
      stable: {
        options: {
          endpoint: grunt.option('endpoint'),
          stageDir: 'staging/'
        },
        files: [
          {
            expand: true,
            src: ['script.js']
          }
        ]
      }
    }
  });

  grunt.loadTasks('../../../tasks');

};
