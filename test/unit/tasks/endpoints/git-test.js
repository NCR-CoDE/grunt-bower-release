'use strict';

exports.shouldCallRemoveTagWhenRemovingVersionTags = function(test) {
  test.expect(1);

  var grunt = {
    option: function() {},
  };

  var async = {
    eachSeries: function() {}
  };

  var sinon = require('sinon');

  var mock = sinon.spy(async, 'eachSeries');

  var tags = ['1.0.0-SNAPSHOT+1', '1.0.0-SNAPSHOT+2']
  var done = function() {};

  var testee = require('../../../../tasks/endpoints/git.js')(grunt, async);
  testee.removeVersionTags(tags, done);

  test.ok(mock.calledWith(tags, testee.removeTag, done));

  test.done();
};

exports.shouldRemoveGitTag = function(test) {
  test.expect(1);

  var grunt = {
    option: function() {},
    util: {
      spawn: function() {}
    }
  };

  var sinon = require('sinon');

  var mock = sinon.spy(grunt.util, 'spawn');

  var tag = '1.0.0-SNAPSHOT+1';
  var done = function() {};

  var testee = require('../../../../tasks/endpoints/git.js')(grunt);
  testee.removeTag(tag, done);

  test.ok(mock.calledWith({ 
    cmd: 'git',
    args: ['tag', '-d', tag],
    opts: { stdio: [undefined, undefined, undefined]}
  }, done));

  test.done();
};