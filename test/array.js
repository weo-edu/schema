var Schema = require('../lib/array');
var assert = require('assert');

describe('Schema array', function() {
  describe('#items', function() {
    it('should return a new schema instance', function() {
      var schema = Schema();
      var schema2 = schema.items({type: 'string'});
      assert.notEqual(schema, schema2);
    });

    it('should set items with schema', function() {
      var schema = Schema().items({type: 'string'});
      assert.deepEqual(schema.schema, {
        messages: {},
        items: {type: 'string'},
        type: 'array'
      });
    });
  });

  describe('#item', function() {
    it('should return a new schema instance', function() {
      var schema = Schema();
      var schema2 = schema.item({type: 'string'});
      assert.notEqual(schema, schema2);
    });

    it('should add an item to items with schema', function() {
      var schema = Schema().item({type: 'string'});
      assert.deepEqual(schema.schema, {
        messages: {},
        items: [{type: 'string'}],
        type: 'array'
      });
    });
  });

  describe('#others', function() {
    it('should return a new schema instance', function() {
      var schema = Schema();
      var schema2 = schema.others({type: 'string'});
      assert.notEqual(schema, schema2);
    });

    it('should set additonalItems on array schema', function() {
      var schema = Schema().others({type: 'string'});
      assert(schema.schema.additionalItems);
    });
  });

  describe('#max', function() {
    it('should return a new schema instance', function() {
      var schema = Schema();
      var schema2 = schema.max(1);
      assert.notEqual(schema, schema2);
    });

    it('should set maxItems on array schema', function() {
      var schema = Schema().max(1);
      assert(schema.schema.maxItems);
    });

  });

  describe('#min', function() {
    it('should return a new schema instance', function() {
      var schema = Schema();
      var schema2 = schema.min(0);
      assert.notEqual(schema, schema2);
    });

    it('should set minItems on array schema', function() {
      var schema = Schema().min(1);
      assert(schema.schema.minItems);
    });
  });

  describe('#unique', function() {
    it('should return a new schema instance', function() {
      var schema = Schema();
      var schema2 = schema.unique(true);
      assert.notEqual(schema, schema2);
    });

    it('should set uniqueItems on array schema', function() {
      var schema = Schema().unique(true);
      assert(schema.schema.uniqueItems);
    });
  });

});