var Schema = require('../lib/base');
var assert = require('assert');

describe('Schema base', function() {
  describe('#Schema', function() {
    it('should create an empty schema object', function() {
      var schema = Schema();
      assert.deepEqual({}, schema.schema);
    });
  });

  describe('#toJSON', function() {
    it('should return a clone of the schema', function() {
      var schema = Schema();
      var json = schema.toJSON();
      assert.notEqual(schema.schema, json);
      assert.deepEqual({}, json);
    });
  });



  describe('#extend', function() {
    it('should return a new schema instance', function() {
      var schema = Schema();
      var schema2 = schema.extend({id: {type: 'string'}});

      assert.notEqual(schema, schema2);
    });

    it('should extend schema with property', function() {
      var schema = Schema().extend({id: {type: 'string'}});
      assert.deepEqual(schema.schema.id, {type: 'string'});
    });
  });



  describe('.use', function() {
    it('should add validate', function() {
      Schema.use(function(schema) {
        return function() {
          return true;
        };
      });
      var schema = Schema();
      assert(schema.validate);
    });

    it('validator should receive schema', function() {
      var json = {id: {type: 'string'}};
      Schema.use(function(schema) {
        assert.deepEqual(json, schema);
        return function() {
          return true;
        };
      });
      var schema = Schema(json);
    });
  });

});


