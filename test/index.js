var Schema = require('..');
var base = require('../lib/base');
var array = require('../lib/array');
var number = require('../lib/number');
var string = require('../lib/string');
var object = require('../lib/object');
var assert = require('assert');

describe('Schema()', function() {
  it('create object', function() {
    var schema = Schema('object');
    assert(schema instanceof object);
  });

  it('create array', function() {
    var schema = Schema('array');
    assert(schema instanceof array);
  });

  it('create number', function() {
    var schema = Schema('number');
    assert(schema instanceof number);
  });

  it('create integer', function() {
    var schema = Schema('integer');
    assert(schema instanceof number);
  });

  it('create string', function() {
    var schema = Schema('string');
    assert(schema instanceof string);
  });

  it('create boolean', function() {
    var schema = Schema('boolean');
    assert(schema instanceof base);
  });

  it('create null', function() {
    var schema = Schema('null');
    assert(schema instanceof base);
  });
});