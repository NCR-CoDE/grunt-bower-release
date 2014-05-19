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

  test.ok(mock.calledWith(tags, testee.removeLocalTag, done));

  test.done();
};

exports.shouldRemoveLocalGitTag = function(test) {
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
  testee.removeLocalTag(tag, done);

  test.doesNotThrow(function() {
    sinon.assert.calledWith(mock, {
      cmd: 'git',
      args: ['tag', '-d', tag],
      opts: { stdio: [undefined, undefined, undefined] }
    }, sinon.match.func)
  });

  test.done();
};

exports.shouldRemoveRemoteGitTag = function(test) {
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
  testee.removeRemoteTag(tag, done);

  test.doesNotThrow(function () {
    sinon.assert.calledWith(mock, { 
      cmd: 'git',
      args: ['push', 'origin', ':refs/tags/' + tag],
      opts: { stdio: [undefined, undefined, undefined]}
    }, done);
  });

  test.done();
};