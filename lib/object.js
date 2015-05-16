/**
 * Modules
 */

var inherits = require('component-inherit');
var is = require('is');
var sliced = require('sliced');

/**
 * Libs
 */

var Base = require('./base');
var toJSON = require('./utils').toJSON;

/**
 * Expose object schema
 */

module.exports = Schema;

/**
 * Initialize Schema
 */

function Schema(json) {
  if (!(this instanceof Schema)) return new Schema(json);
  Base.call(this, json);
  this.schema.type = 'object';
}

/**
 * Inherit from base schema
 */

inherits(Schema, Base);



/**
 * Add property by `name` with optional `schema`.
 *
 * @param {String|Regexp} name
 * @param {Object|Schema} schema
 * @return {Schema}
 */

Schema.prototype.prop = function(name, schema) {
  var json = this.toJSON();
  schema = toJSON(schema);

  var key = 'properties';

  if (is.regexp(name)) {
    key = 'patternProperties';
    name = name.toString();
  }

  json[key] = json[key] || {};
  json[key][name] = schema;
  
  return new Schema(json);
};

/**
 * Set whether additional (other) properties are `allowed`
 * or if it is a `schema`, the type of the additional properties
 *
 * @param {Boolean|Object|Schema} allowedOrSchema
 * @return {Schema}
 */

Schema.prototype.others = function(allowedOrSchema) {
  return this.extend({additionalProperties: toJSON(allowedOrSchema)});
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
    delete json.properties[names[i]];
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
  var props = json.properties;
  json.properties = {};

  for (var i = 0; i < names.length; i++) {
    json.properties[names[i]] = props[names[i]];
  }

  return new Schema(json);
};



