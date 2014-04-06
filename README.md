level-http [![NPM version](https://badge.fury.io/js/level-http.svg)](http://badge.fury.io/js/level-http) [![Build Status](https://travis-ci.org/fiveisprime/level-http.svg?branch=master)](https://travis-ci.org/fiveisprime/level-http)
==========

Access your LevelDB instances from multiple processes using HTTP.

# Usage

Configure the server then start it up:

``` js
var server = require('level-http')({
  db: './mydb'
, port: process.env.PORT || 8000
, auth: {
    username: 'test'
  , password: 'test'
  }
});

server.start();
```

_As of version 0.1.0, node version 0.8.x and up are supported and authentication
is also optional._

## Supported Routes/Methods

`/data`

  * GET - retrieve all keys/values

`/data/:key`

  * GET - retrieve a value
  * POST - add a value
  * DELETE - delete a value

# License

The MIT License (MIT)

Copyright (c) 2013 Matt Hernandez

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
