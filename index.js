var is = require('is');

var base = require('./lib/base');

var array = require('./lib/array');
var number = require('./lib/number');
var string = require('./lib/string');
var object = require('./lib/object');

var types = require('./lib/types');

module.exports = schema;

schema.types = types;

function schema(type, json) {
  if (is.object(type)) {
    json = type;
    type = json.type;
  }

  if (!type) {
    type = 'object';
  }

  if(!json)
    json = {};

  json.type = type;

  switch(type) {
    case 'array':
      return array(json);
    case 'object': 
      return object(json);
    case 'number':
    case 'integer':
      return number(json);
    case 'string':
      return string(json);
    default:
      return base(json);
  }

};






