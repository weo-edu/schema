/**
 * Modules
 */

var is = require('is')

/**
 * Libs
 */

var base = require('./lib/base')
var array = require('./lib/array')
var number = require('./lib/number')
var string = require('./lib/string')
var object = require('./lib/object')

/**
 * Expose schema
 */

module.exports = schema

/**
 * Schema factory
 *
 * @param {String} type
 * @param {Object} json
 * @return {Schema}
 */

function schema (type, json) {
  if (is.object(type)) {
    json = type
    type = json.type
  }

  if (!type) {
    type = 'object'
  }

  switch (type) {
    case 'array':
      return array(json)
    case 'object':
      return object(json)
    case 'number':
    case 'integer':
      return number(json)
    case 'string':
      return string(json)
    default:
      return base(json)
  }
}
