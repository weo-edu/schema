var Schema = require('../lib/object');
var assert = require('assert');

describe('Schema object', function() {

  describe('#prop', function() {
    it('should return a new schema instance', function() {
      var schema = Schema();
      var schema2 = schema.prop('id', {type: 'string'});
      assert.notEqual(schema, schema2);
    });

    it('should add a property with settings', function() {
      var schema = Schema();
      schema = schema.prop('id', {type: 'string'});
      assert.deepEqual(schema.schema.properties.id, {type: 'string'});
    });

    it('should add a sub schema at property', function() {
      var one = Schema({type: 'object'});
      var two = Schema().prop('id');
      var three = two.prop('object', one);
      assert.deepEqual(three.schema, {
        properties: {
          id: {},
          object: {type: 'object'}
        },
        type: 'object'
      });
    });

    it('should add pattern properties when property is a regex', function() {
      var schema = Schema().prop(/[ab]/, {type: 'string'});
      assert.deepEqual(schema.schema, {
        patternProperties: {
          '/[ab]/': {type: 'string'}
        },
        type: 'object'
      });
    });

  });

  describe('#omit', function() {
    it('should return a new schema instance', function() {
      var schema = Schema().prop('id', {type: 'string'});
      var schema2 = schema.omit('id');
      assert.notEqual(schema, schema2);
    });

    it('should omit a property', function() {
      var schema = Schema().prop('id').omit('id');
      assert(!schema.schema.properties.id);
    });

    it('should omit many properties', function() {
      var schema = Schema().prop('id').prop('name').omit('id', 'name');
      assert(!schema.schema.properties.id);
      assert(!schema.schema.properties.name);
    });
  });

  describe('#pick', function() {
    it('should return a new schema instance', function() {
      var schema = Schema().prop('id').prop('name');
      var schema2 = schema.pick('id');
      assert.notEqual(schema, schema2);
    });

    it('should pick a property', function() {
      var schema = Schema().prop('id').prop('name').pick('id');
      assert(schema.schema.properties.id);
      assert(!schema.schema.properties.name);
    });

    it('should pick many properties', function() {
      var schema = Schema().prop('id').prop('name').prop('password').pick('id', 'password');
      assert(schema.schema.properties.id);
      assert(schema.schema.properties.password);
      assert(!schema.schema.properties.name);
    });
  });

});