# express-sendjson

```
npm install express-sendjson
```

Express-sendjson is a simple express middleware that wraps the res.status(#).json({}) functionality into a single function with additional metadata about the response. 
By default the middleware wraps the json response under a root level property on the response called "data" which is configurable. 
The other root level metadata properties about the json response are disabled by default. 
If you wish to enable any of the metadata properties on the json response see the examples below.

## Setup
Default settings
```js
var sendJSON = require('express-sendjson');
var app = require('express')()
app.use(sendJSON(
    {
        "responseProperty": {
            "value": "data"
        },
        "apiVersion": {
            "enabled": false,
            "value": "1.0.0"
        },
        "status": {
            "enabled": false,
            "value": function(data) {
                  return (data instanceof Error) ? "error" : "success";
              }
        },
        "count": {
            "enabled": false
        },
        "statusCode": {
            "enabled": false,
            "value": function(data) {
                return (data instanceof Error) ? 500 : 200
            }
        }
    }
));
app.listen(3000)
```

Overriding default settings
```js
var sendJSON = require('express-sendjson');
var app = require('express')()
app.use(sendJSON(
    {
        "responseProperty": {
            "value": "result"
        },
        "apiVersion": {
            "enabled": true,
            "value": "1.2.3"
        },
        "status": {
            "enabled": true,
            "value": function(data) {
                // logic Here
                // return some status message
            }
        },
        "count": {
            "enabled": true
        },
        "statusCode": {
            "enabled": true,
            "value": function(data) {
                // logic Here
                // return a status code
            }
        }
    }
));
app.listen(3000)
```

## Examples

#### Object
```js
app.use(sendJSON(
    {
       "statusCode": {
            "enabled": true
        }
    }
));
```
Usage
```js
res.sendJSON({message: "hello"});
```
Response
```json
{
    "statusCode": 200,
    "data": {
      "message": "hello"
    }
}
```

#### Array
```js
app.use(sendJSON(
    {
        "count": {
            "enabled": true
        },
        "statusCode": {
            "enabled": true
        }
    }
));
```
Usage
```js
res.sendJSON([
    {message: "hello"},
    {message: "there"}
]);
```
Response
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
```js
app.use(sendJSON(
    {
        "count": {
            "enabled": true
        },
        "statusCode": {
            "enabled": true
        }
    }
));
```
Usage
```js
res.sendJSON(new Error('Oh Noes!'))
```
Response
```json
{
    "statusCode": 500,
    "data": {
      "message": "Oh Noes!"
    }
}
```

#### Status Code

Usage
```js
res.sendJSON({message: "Entity created."}, 201)
```
Response
```json
{
    "statusCode": 201,
    "data": {
      "message": "Entity created."
    }
}
```

## Future Enhancements
* Response Time
* Self-Uri's

### Feedback
Feel free to open bugs or file enhancement requests. I'm always open to suggestions, Thanks!
