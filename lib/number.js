/**
 * Modules
 */

var inherits = require('component-inherit')
var assert = require('assert')

/**
 * Libs
 */

var Base = require('./base')

/**
 * Expose number schema
 */

module.exports = Schema

/**
 * Initialize Schema
 */

function Schema (json) {
  if (!(this instanceof Schema)) return new Schema(json)
  Base.call(this, json)
  this.schema.type = this.schema.type || 'number'
  assert(this.schema.type === 'number' || this.schema.type === 'integer')
}

/**
 * Inherit from base schema
 */

inherits(Schema, Base)

/**
 * Set `maximum` value of number
 *
 * @param {Number} maximum
 * @return {Schema}
 */

Schema.prototype.max = function (maximum, message) {
  return this.extend({maximum: maximum, messages: {maximum: message}})
}

/**
 * Set `minimum` value of number
 *
 * @param {Number} minimum
 * @return {Schema}
 */

Schema.prototype.min = function (minimum, message) {
  return this.extend({minimum: minimum, messages: {minimum: message}})
}

/**
 * Restrict number to `multipleOf`
 *
 * @param {Number} multipleOf
 * @return {Schema}
 */

Schema.prototype.multiple = function (multipleOf, message) {
  return this.extend({multipleOf: multipleOf, messages: {multipleOf: message}})
}

/**
 * Makes maximum `nonInclusive`
 *
 * @param {Boolean} nonInclusive
 * @return {Schema}
 */

Schema.prototype.exclusiveMax = function (nonInclusive, message) {
  return this.extend({exclusiveMaximum: nonInclusive, messages: {exclusiveMaximum: message}})
}

/**
 * Alias exclusiveMax
 */

Schema.prototype.openRight = Schema.prototype.exclusiveMax

/**
 * Makes minimum `nonInclusive`
 *
 * @param {Boolean} nonInclusive
 */

Schema.prototype.exclusiveMin = function (nonInclusive, message) {
  return this.extend({exclusiveMinimum: nonInclusive, messages: {exclusiveMinimum: message}})
}

/**
 * Alias exclusiveMin
 */

Schema.prototype.openLeft = Schema.prototype.exclusiveMin
