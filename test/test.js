var Schema = require('..');
var assert = require('assert');

describe('Schema', function() {
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

  describe('#add', function() {
    it('should return a new schema instance', function() {
      var schema = Schema();
      var schema2 = schema.add('id', {type: 'string'});
      assert.notEqual(schema, schema2);
    });

    it('should add a property with settings', function() {
      var schema = Schema();
      schema = schema.add('id', {type: 'string'});
      assert.deepEqual(schema.schema.id, {type: 'string'});
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

  describe('#omit', function() {
    it('should return a new schema instance', function() {
      var schema = Schema({id: {type: 'string'}});
      var schema2 = schema.omit('id');
      assert.notEqual(schema, schema2);
    });

    it('should omit a property', function() {
      var schema = Schema().add('id').omit('id');
      assert(!schema.schema.id);
    });

    it('should omit many properties', function() {
      var schema = Schema().add('id').add('name').omit('id', 'name');
      assert(!schema.schema.id);
      assert(!schema.schema.name);
    });
  });

  describe('#pick', function() {
    it('should return a new schema instance', function() {
      var schema = Schema().add('id').add('name');
      var schema2 = schema.pick('id');
      assert.notEqual(schema, schema2);
    });

    it('should pick a property', function() {
      var schema = Schema().add('id').add('name').pick('id');
      assert(schema.schema.id);
      assert(!schema.schema.name);
    });

    it('should pick many properties', function() {
      var schema = Schema().add('id').add('name').add('password').pick('id', 'password');
      assert(schema.schema.id);
      assert(schema.schema.password);
      assert(!schema.schema.name);
    });
  });

  describe('#sub', function() {
    it('should return a new schema instance', function() {
      var one = Schema({type: 'object'});
      var two = Schema().add('id');
      var three = two.sub('object', one);
      assert.notEqual(two, three);
    });

    it('should add a sub schema at property', function() {
      var one = Schema({type: 'object'});
      var two = Schema().add('id');
      var three = two.sub('object', one);
      assert.deepEqual(three.schema, {
        id: {},
        object: {type: 'object'}
      });
    });
  });

  for (var i in Schema.types) test(Schema.types[i]);


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


function test(type) {
  describe('#' + type, function() {
    it('should return a new instance', function() {
      var one =  Schema();
      var two = one[type]('id');
      assert.notEqual(one, two);
    });

    it('should add a property with settings', function() {
      var schema = Schema()[type]('id', {setting: true});
      assert.deepEqual(schema.schema.id, {
        setting: true,
        type: type
      });
    });
  });
}
