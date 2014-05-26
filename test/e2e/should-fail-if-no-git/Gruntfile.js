'use strict';

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({

    bowerRelease: {
      stable: {
        options: {
          endpoint: 'repo.git',
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
