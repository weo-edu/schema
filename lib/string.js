/**
 * Modules
 */

var inherits = require('component-inherit');
var is = require('is');

/**
 * Libs
 */

var Base = require('./base');

/**
 * Expose string schema
 */

module.exports = Schema;

/**
 * Initialize Schema
 */

function Schema(json) {
  if (!(this instanceof Schema)) return new Schema(json);
  Base.call(this, json);
  this.schema.type = 'string';
}

/**
 * Inherit from base schema
 */

inherits(Schema, Base);


/**
 * Sets the maximum length of a string to `maxLength`
 *
 * @param {Number} maxLength
 * @return {Schema}
 */

Schema.prototype.max = function(maxLength) {
  return this.extend({maxLength: maxLength});
};

/**
 * Sets the minimum length of a string to `minLength`
 *
 * @param {Number} minLength
 * @return {Schema}
 */


Schema.prototype.min = function(minLength) {
  return this.extend({minLength: minLength});
};

/**
 * Sets the `pattern` that the string must match
 *
 * @param {Regexp|String} pattern 
 * @return {Schema}
 */

Schema.prototype.pattern = function(pattern) {
  if (pattern.toString)
    pattern = pattern.toString();
  return this.extend({pattern: pattern});
};

/**
 * Sets the `format` for the string
 *
 * @param {String} format
 * @return {Schema}
 */

Schema.prototype.format = function(format) {
  return this.extend({format: format});
};

