# Express sendJSON response middleware

### Installation
```
npm install express-sendjson
```

This is a simple express middleware that wraps the functionality of res.status(#).json(data) with some additional metadata by adding sendJSON to res.

Here are the default settings.
```json
{
    "apiVersion": {
        "enabled": false,
        "value": "1.0.0"
    },
    "status": {
        "enabled": false,
        "value": "success"
    },
    "count": {
        "enabled": true
    },
    "code": {
        "enabled": true,
        "value": 200
    }
}
```

## Examples
This is a bare minimum example that will use the default settings.

### Setup
```js
var sendJSON = require('express-sendjson');
var express = require('express')
var app = express()

app.use(sendJSON());

app.listen(3000)
```
### Usage with an Object
```js
res.sendJSON({message: "hello"});
```

### Output
```json
{
    "code": 200,
    "data": {
      "message": "hello"
    }
}
```

### Usage with an Array
```js
res.sendJSON([{message: "hello"}, {message: "there"}]);
```

### Output
```json
{
    "count": 2,
    "code": 200,
    "data": [
        {"message": "hello"},
        {"message": "there"}
    ]
}
```

## Options
This middleware allows for properties to be toggled on and off. By default only code and count are enabled. Most properties can be toggled through the initial config besides code this property is configured through an individual response if needed. By default all responses are 200 unless code is declared on the response.

### apiVersion
```js
app.use(sendJSON({
    "apiVersion": {
        "enabled": true,
        "value": "1.2.3"
    }
}));
```

The res.sendJSON output appear as so.
```json
{
    "apiVersion": "1.2.3",
    "code": 200,
    "data": {
      "message": "hello"
    }
}
```

### code
```js
res.sendJSON({message:"Entity created."}, {code: 201})
```

The res.sendJSON output appear as so with the defaults.
```json
{
    "code": 201,
    "data": {
      "message": "Entity created."
    }
}
```

### Feedback
Feel free to open bugs or file enhancement requests. I'm always open to improvements. Thanks!
