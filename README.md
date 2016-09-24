# express-sendjson

## Installation
```
npm install express-sendjson
```

Express-sendjson is a simple express response middleware that wraps res.status(#).json({}) with some additional metadata about the response or error by adding sendJSON to the response object.

Here are the default settings.
```json
{
    "apiVersion": {
        "enabled": false,
        "value": "1.0.0"
    },
    "status": {
        "enabled": false,
        "value": "success" ||  "error"
    },
    "count": {
        "enabled": true
    },
    "statusCode": {
        "enabled": true,
        "value": 200 || 500
    }
}
```

## Setup
```js
var sendJSON = require('express-sendjson');
var express = require('express')
var app = express()

app.use(sendJSON());

app.listen(3000)
```

## Examples
This is a bare minimum example that will use the default settings.

### Object
```js
res.sendJSON({message: "hello"});
```

```json
{
    "statusCode": 200,
    "data": {
      "message": "hello"
    }
}
```

### Array
```js
res.sendJSON([
    {
        message: "hello"
    },
    {
        message: "there"
    }
]);
```

```json
{
    "count": 2,
    "statusCode": 200,
    "data": [
        {
          "message": "hello"
        },
        {
          "message": "there"
        }
    ]
}
```

### Error

In this example a generic error without statusCode which defaults to 500.
```js
res.sendJSON(new Error('Oh Noes!'))
```

```json
{
    "statusCode": 500,
    "data": {
      "message": "Oh Noes!"
    }
}
```

In this example an error with statusCode overrides the default 500.
```js
var error = new Error('Oh Noes!');
error.statusCode = 400;
res.sendJSON(error)
```

```json
{
    "statusCode": 400,
    "data": {
      "message": "Oh Noes!",
      "statusCode": 400
    }
}
```

## Settings
The express-sendjson response middleware allows for properties to be toggled on and off. All properties can be toggled and set through the initial middleware settings or through individual response settings. By default all success responses are 200 and error responses are 500 unless specified.

### Default Middlware Settings
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
    "statusCode": 200,
    "data": {
      "message": "hello"
    }
}
```

### Individual Response Settings
```js
res.sendJSON(
    {
        message: "Entity created."
    },
    {
        statusCode: {
            value: 201
        }
    }
)
```

## Future Enhancements
* Response Time
* Self-Uri's

### Feedback
Feel free to open bugs or file enhancement requests. I'm always open to suggestions, Thanks!
