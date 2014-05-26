'use strict';

var projectDir = process.cwd();
var exec = require('child_process').exec;

exports.tearDown = function (done) {
  exec('rm -rf staging', function () {
    process.chdir(projectDir);
    done();
  });

};

exports['should fail if the Git endpoint is not available when cloning'] = function (test) {
  test.expect(1);

  process.chdir(projectDir + '/test/e2e/should-fail-if-no-git/');

  exec('grunt bowerRelease', function (error) {
    test.notEqual(error, null);

    test.done();
  });
};

exports['should fail if there already a Git tag with the same name'] = function (test) {
  test.expect(1);

  process.chdir(projectDir + '/test/e2e/should-fail-if-tag-exists/');

  exec('grunt bowerRelease --endpoint=file:///' + process.cwd() + '/repo.git', function (error) {
    test.ok(error !== null);

    test.done();
  });
};

exports['should remove the staging dir when failing unless debug is set'] = function (test) {
  test.expect(1);

  process.chdir(projectDir + '/test/e2e/should-fail-if-tag-exists/');

  exec('grunt bowerRelease --endpoint=file:///' + process.cwd() + '/repo.git', function (error) {
    var fs = require('fs');
    test.equal(fs.existsSync('staging'), false);

    test.done();
  });
};
