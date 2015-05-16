var Schema = require('../lib/number');
var assert = require('assert');

describe('Schema number', function() {


  describe('#max', function() {
    it('should return a new schema instance', function() {
      var schema = Schema();
      var schema2 = schema.max(1);
      assert.notEqual(schema, schema2);
    });

    it('should set maximum on array schema', function() {
      var schema = Schema().max(1);
      assert(schema.schema.maximum);
    });

  });

  describe('#min', function() {
    it('should return a new schema instance', function() {
      var schema = Schema();
      var schema2 = schema.min(0);
      assert.notEqual(schema, schema2);
    });

    it('should set minimum on array schema', function() {
      var schema = Schema().min(1);
      assert(schema.schema.minimum);
    });
  });

  describe('#multiple', function() {
    it('should return a new schema instance', function() {
      var schema = Schema();
      var schema2 = schema.others({type: 'string'});
      assert.notEqual(schema, schema2);
    });

    it('should set multipleOf on array schema', function() {
      var schema = Schema().others({type: 'string'});
      assert(schema.schema.multipleOf);
    });
  });

  describe('#openRight', function() {
    it('should return a new schema instance', function() {
      var schema = Schema();
      var schema2 = schema.unique(true);
      assert.notEqual(schema, schema2);
    });

    it('should set exclusiveMaximum on array schema', function() {
      var schema = Schema().unique(true);
      assert(schema.schema.exclusiveMaximum);
    });
  });

  describe('#openLeft', function() {
    it('should return a new schema instance', function() {
      var schema = Schema();
      var schema2 = schema.others({type: 'string'});
      assert.notEqual(schema, schema2);
    });

    it('should set exclusiveMinimum on array schema', function() {
      var schema = Schema().others({type: 'string'});
      assert(schema.schema.additionalItems);
    });
  });

});