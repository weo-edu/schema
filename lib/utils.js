/**
 * Modules
 */

var is = require('is')

/**
 * Convert to json if object or undefined
 *
 * @param {Object} jsonOrSchema
 * @return {Object}
 */

exports.toJSON = function (jsonOrSchema) {
  if (is.object(jsonOrSchema)) {
    return jsonOrSchema.toJSON && jsonOrSchema.toJSON() || jsonOrSchema
  } else if (is.undefined(jsonOrSchema)) {
    return {}
  } else {
    return jsonOrSchema
  }
}
