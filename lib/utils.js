/**
 * Modules
 */

var typeOf = require('component-type')

/**
 * Convert to json if object or undefined
 *
 * @param {Object} jsonOrSchema
 * @return {Object}
 */

exports.toJSON = function (jsonOrSchema) {
  if (typeOf(jsonOrSchema) === 'object') {
    return jsonOrSchema.toJSON && jsonOrSchema.toJSON() || jsonOrSchema
  } else if (typeOf(jsonOrSchema) === 'undefined') {
    return {}
  } else {
    return jsonOrSchema
  }
}
