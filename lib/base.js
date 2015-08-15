/**
 * Modules
 */

var clone = require('component-clone')
var assign = require('object-assign')

/**
 * Lib
 */

var toJSON = require('./utils').toJSON

/**
 * Expose Schema.
 */

module.exports = exports = Schema

/**
 * Initialize a new `Schema` with `json`.
 */

function Schema (json) {
  if (!(this instanceof Schema)) return new Schema(json)
  this.schema = json || {}
}

/**
 * Return a JSON repesentation of the schema.
 *
 * @return {Object}
 */

Schema.prototype.toJSON = function () {
  return clone(this.schema)
}

/**
 * Extend with `schema`
 *
 * @param  {Object | Schema} schema
 * @return {Schema}
 */

Schema.prototype.extend = function (schema) {
  var json = this.toJSON()
  schema = schema.toJSON ? schema.toJSON() : schema

  var messages = assign({}, json.messages, schema.messages)
  var json = assign({}, json, schema, {messages: messages})

  return new (this.constructor)(json)
}

/**
 * Specify `title` of schema
 *
 * @param {String} title
 * @return {Schema}
 */

Schema.prototype.title = function (title, mesage) {
  return this.extend({title: title, messages: {title: message}})
}

/**
 * Specify `description` for schema
 *
 * @param {String} description
 * @return {Schema}
 */

Schema.prototype.description = function (description, message) {
  return this.extend({description: description, messages: {description: message}})
}

/**
 * Specify `def` value for schema
 *
 * @param {Any} default
 * @return {Schema}
 */

Schema.prototype.default = function (def, message) {
  return this.extend({default: def, messages: {default: message}})
}

/**
 * Mark fields or this schema as reqired
 *
 * @param {Boolean|Array} required
 * @return {Schema}
 */

Schema.prototype.required = function (required, message) {
  return this.extend({required: required, messages: {required: message}})
}

/**
 * The value of this schema must be in `en`
 *
 * @param {Any} enum
 * @return {Schema}
 */

Schema.prototype.enum = function (en, message) {
  return this.extend({enum: en, messages: {enum: message}})
}

/**
 * The value of this schema is valid, if fails to validate against `schema`
 *
 * @param {Object|Schema} schema
 * @return {Schema}
 */

Schema.prototype.not = function (schema, message) {
  schema = schema.toJSON ? schema.toJSON() : schema
  return this.extend({not: schema, messages: {not: message}})
}

/**
 * The value of the schema is valid of if it validates against all
 */

Schema.prototype.all = metaSchema('allOf')

/**
 * The value of the schema is valid of if it validates against any
 */

Schema.prototype.any = metaSchema('anyOf')

/**
 * The value of the schema is valid of if it validates against exactly one
 */

Schema.prototype.one = metaSchema('oneOf')

/**
 * Method generator
 */

function metaSchema (condition) {
  /**
   * The value of this schema is valid, if `condition` is met against `schemas`
   *
   * @param {Array} schemas
   * @return {Schema}
   */

  return function (schemas) {
    var json = {}
    schemas = schemas.map(toJSON)
    json[condition] = schemas
    return this.extend(json)
  }
}
