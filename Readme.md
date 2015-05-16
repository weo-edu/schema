## schema

A library for creating immutable json schemas.

## Installation

```
$ npm install @weo-edu/schema
```


## Example

```javascript

var Schema = require('schema');
var jsen = require('jsen');
Schema.use(jsen);

var id = Schema('string')
  .min(16)
  .max(16)
  .pattern(/[a-zA-Z0-9]+/);

var username = Schema('string')
  .min(3)
  .pattern(/[a-zA-Z_]+/);

var tags = Schema('array')
  .items({type: 'string'});

var user = Schema()
  .prop('id', id)
  .prop('username', username)
  .prop('displayName')
  .required(['id', username']);

var share = Schema()
  .prop('id', id)
  .prop('actor', user)
  .prop('object', {type: 'object'})
  .prop('tags', tags)
  .required(['id', 'actor', 'tags']);

// return true
share.validate({
  id: 'abcdabcdabcdabcd',
  actor: {
    id: 'abcdabcdabcdabcd',
    username: 'tio',
    displayName: 'Tio Tay',
  },
  object: {
    displayName: 'post'
  },
  tags: ['dog', 'post']
});

```