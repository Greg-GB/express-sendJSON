# Express sendJSON middleware

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
var sendJSON = require('sendJSON');
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

