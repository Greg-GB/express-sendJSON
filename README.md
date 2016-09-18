# express-sendjson

### Installation
```
npm install express-sendjson
```

Express-sendjson is a simple express response middleware that wraps res.status(#).json({}) with some additional metadata about the response by adding sendJSON to the response object.

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
res.sendJSON([
    {
        message: "hello"
    },
    {
        message: "there"
    }
]);
```

### Output
```json
{
    "count": 2,
    "code": 200,
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

## Options
The express-sendjson respnse middleware allows for properties to be toggled on and off. All properties can be toggled through the initial config or through individual responses. By default all responses are 200 unless code is declared on the response. Also, by default only code and count are enabled.

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
res.sendJSON(
    {
        message: "Entity created."
    },
    {
        code: {
            enabled: true,
            value: 201
        }
    }
)
```
or shorthand
```js
res.sendJSON(
    {
        message: "Entity created."
    },
    {
        code: 201
    }
)
```

## Future Enhancements
* Response Time
* Self-Uri's
* Error handler (possibly another module)

### Feedback
Feel free to open bugs or file enhancement requests. I'm always open to suggestions, Thanks!
