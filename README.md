# MongoDB connection module
This module was been created to manage the mongodb connections of another modules.

## Usage
To use this module, first of all you need to add it in the package json like this.
```js
{
	"name": "test-module",
	"version": "1.0.0",
	"description": "this file if for test propose"
	"author": "Santiago Sanchez Taborda <santiago.sanchez.t@gmail.com>",
	"main": "./src/index.js",
	"engine": {
		"node": "8.11.2"
	},
	"scripts": {
		"start": "node ./src/index.js"
	},
	"license": "MIT",
	"dependencies": {
		"rps-mongoconnection-module": "git+https://github.com/gh0stl1m/rps-mongoconnection-module"
	}
}
```

later you can call the module and use the connection like this.
```js
// External libraries
const mongoConnection = require('rps-mongoconnection-module');

module.exports = mongoConnection;
```

### Additional note
The module is part of the Game of Drones ecosystem, it it a technical test for the company UruIT.