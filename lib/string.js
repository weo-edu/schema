/**
 * Modules
 */

var inherits = require('component-inherit')

/**
 * Libs
 */

var Base = require('./base')

/**
 * Expose string schema
 */

module.exports = Schema

/**
 * Initialize Schema
 */

function Schema (json) {
  if (!(this instanceof Schema)) return new Schema(json)
  Base.call(this, json)
  this.schema.type = 'string'
}

/**
 * Inherit from base schema
 */

inherits(Schema, Base)

/**
 * Sets the maximum length of a string to `maxLength`
 *
 * @param {Number} maxLength
 * @return {Schema}
 */

Schema.prototype.max = function (maxLength, message) {
  return this.extend({maxLength: maxLength, messages: {maxLength: message}})
}

/**
 * Sets the minimum length of a string to `minLength`
 *
 * @param {Number} minLength
 * @return {Schema}
 */

Schema.prototype.min = function (minLength, message) {
  return this.extend({minLength: minLength, messages: {minLength: message}})
}

/**
 * Sets the `pattern` that the string must match
 *
 * @param {Regexp|String} pattern
 * @return {Schema}
 */

Schema.prototype.pattern = function (pattern, message) {
  if (pattern.source) {
    pattern = pattern.source
  }
  return this.extend({pattern: pattern, messages: {pattern: message}})
}

/**
 * Sets the `format` for the string
 *
 * @param {String} format
 * @return {Schema}
 */

Schema.prototype.format = function (format, message) {
  return this.extend({format: format, messages: {format: message}})
}
