/**
 * Modules
 */

var clone = require('component-clone');
var sliced = require('sliced');

/**
 * Vars
 */


var validator = null;

/**
 * Expose Schema.
 */

module.exports = exports = Schema;

/**
 * Expose types
 */

var types = exports.types = ['array', 'boolean', 'integer', 'number', 'null', 'object', 'string'];

/**
 * Initialize a new `Schema` with `json`.
 */

function Schema(json) {
  if (!(this instanceof Schema)) return new Schema(json);
  this.schema = json || {};

  if (validator)
    this.validate = validator(this.schema);
}

/**
 *
 * Add validator `fn` to schema
 *
 * @param {Function} fn a validator that takes a schema and returns a validate functions
 */

Schema.use = function(fn) {
  validator = fn;
};

/**
 * Return a JSON repesentation of the schema.
 *
 * @return {Object}
 */

Schema.prototype.toJSON = function () {
  return clone(this.schema);
};

/**
 * Add property by `name` with optional `settings`.
 *
 * @param {String} name
 * @param {Object} settings (optional)
 * @return {Schema}
 */

Schema.prototype.add = function(name, settings) {
  var json = this.toJSON();
  json[name] = settings || {};
  return new Schema(json);
};

/**
 * Extend with `schema`
 * 
 * @param  {Object | Schema} schema
 * @return {Schema}
 */

Schema.prototype.extend = function(schema) {
  var json = this.toJSON();
  schema = schema.toJSON ? schema.toJSON() : schema;

  for (var key in schema) {
    json[key] = schema[key];
  }

  return new Schema(json);
};

/**
 * Remove properties by `names`.
 *
 * @param {String} ...names
 * @return {Schema}
 */

Schema.prototype.omit = function(/* ...names */) {
  var names = sliced(arguments);
  var json = this.toJSON();

  for (var i = 0; i < names.length; i++) {
    delete json[names[i]];
  }

  return new Schema(json);
};

/**
 * Alias omit
 */

Schema.prototype.remove = Schema.prototype.omit;


/**
 * Take properties by `names`
 *
 * @param {String} ...names
 * @return {Schema}
 */

Schema.prototype.pick = function(/* ...names */) {
  var names = sliced(arguments);
  var json = this.toJSON();
  var picked = {};

  for (var i = 0; i < names.length; i++) {
    picked[names[i]] = json[names[i]];
  }

  return new Schema(picked);
};

/**
 * Generate add methods for each type
 */

for (var i in types) Schema.prototype[types[i]] = generateTypedAdd(types[i]);

/**
 * Add property by `name` with settings from other schema
 *
 * @param {String} name
 * @param {Schema} schema
 * @return {Schema}
 */

Schema.prototype.sub = function(name, schema) {
  return this.add(name, schema.toJSON());
};

/**
 * Genearte an add given a `type`
 *
 * @param {String} type
 * @return {Function}
 */

function generateTypedAdd(type) {

  /**
   * Add a property of `type` by `name` with `settings`.
   *
   * @param {String} name
   * @param {String} settings
   * @return {Schema}
   */

  return function(name, settings) {
    settings = settings || {};
    settings.type = type;
    return this.add(name, settings);
  };
}


