/**
 * Modules
 */

var inherits = require('component-inherit')
var typeOf = require('component-type')

/**
 * Libs
 */

var Base = require('./base')
var toJSON = require('./utils').toJSON

/**
 * Expose array schema
 */

module.exports = Schema

/**
 * Initialize Schema
 */

function Schema (json) {
  if (!(this instanceof Schema)) return new Schema(json)
  Base.call(this, json)
  this.schema.type = 'array'
}

/**
 * Inherit from base schema
 */

inherits(Schema, Base)

/**
 * Set items types to `items`
 *
 * @param {Object|Array} items
 * @return {Schema}
 */

Schema.prototype.items = function (items) {
  if (typeOf(items) === 'array') {
    items = items.map(toJSON)
  } else {
    items = toJSON(items)
  }

  return this.extend({items: items})
}

/**
 * Add item to items list
 *
 * @param {Object} schema
 * @return {Schema}
 */

Schema.prototype.item = function (schema) {
  var items = this.schema.items || []
  items.push(schema)
  return this.items(items)
}

/**
 * Set whether additional (other) items are `allowed`,
 * or if it is a `schema` the type of additional items.
 *
 * @param {Boolean|Object|Schema} allowedOrSchema
 * @return {Schema}
 */

Schema.prototype.others = function (allowedOrSchema) {
  return this.extend({additionalItems: toJSON(allowedOrSchema)})
}

/**
 * Sets the maximum number of items in array to `maxItems`
 *
 * @param {Number} maxItems
 * @return {Schema}
 */

Schema.prototype.max = function (maxItems, message) {
  return this.extend({maxItems: maxItems, messages: {maxItems: message}})
}

/**
 * Sets the minimum number of items in array to `minItems`
 *
 * @param {Number} minItems
 * @return {Schema}
 */

Schema.prototype.min = function (minItems, message) {
  return this.extend({minItems: minItems, messages: {minItems: message}})
}

/**
 * Sets whether items in array must be `uniqueItems`
 *
 * @param {Boolean} uniqueItems
 * @return {Schema}
 */

Schema.prototype.unique = function (uniqueItems, message) {
  return this.extend({uniqueItems: uniqueItems, messages: {uniqueItems: message}})
}
