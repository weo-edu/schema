var Schema = require('../lib/string');
var assert = require('assert');
var is = require('is');

describe('Schema number', function() {
  describe('#max', function() {
    it('should return a new schema instance', function() {
      var schema = Schema();
      var schema2 = schema.max(1);
      assert.notEqual(schema, schema2);
    });

    it('should set maxLength on array schema', function() {
      var schema = Schema().max(1);
      assert(schema.schema.maxLength);
    });

  });

  describe('#min', function() {
    it('should return a new schema instance', function() {
      var schema = Schema();
      var schema2 = schema.min(0);
      assert.notEqual(schema, schema2);
    });

    it('should set minLength on array schema', function() {
      var schema = Schema().min(1);
      assert(schema.schema.minLength);
    });
  });

  describe('#pattern', function() {
    it('should return a new schema instance', function() {
      var schema = Schema();
      var schema2 = schema.pattern(/[ab]/);
      assert.notEqual(schema, schema2);
    });

    it('should set multipleOf on array schema', function() {
      var schema = Schema().pattern(/[ab]/);
      assert(is.string(schema.schema.pattern));
    });
  });

  describe('#format', function() {
    it('should return a new schema instance', function() {
      var schema = Schema();
      var schema2 = schema.format('uri');
      assert.notEqual(schema, schema2);
    });

    it('should set format on array schema', function() {
      var schema = Schema().format('uri');
      assert(schema.schema.format);
    });
  });

  describe('messages', function() {
    it('should add messages to the schema', function() {
      var schema = Schema().format('uri', 'Invalid URL')
      assert.equal(schema.schema.messages.format, 'Invalid URL')
    })
  })
});