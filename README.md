Deviation
=========

> Manage the deviation between model layers.

[![Build Status](https://travis-ci.org/clitetailor/deviation.svg?branch=master)](https://travis-ci.org/clitetailor/deviation)

Install
-------

```bash
npm install --save deviation
```

Getting Started
---------------

```javascript
class SuperClass {
	constructor() {
		this.onClick = willBeDeviated;
	}

	dispatch() {
		this.onClick('done!')
	}
}

let Deviated = deviate(SuperClass);

let deviated = new Deviated();

deviated.onClick(msg => {
	console.log(msg)
	// => done!
})

deviated.onClick(msg => {
	console.log(msg)
	// => done!
})

deviated.dispatch()
```

```javascript
import { willBeDeviated, deviate } from 'deviation'

let Todos = deviate(class {
	constructor() {
		this.onSuccess = willBeDeviated;
		this.onError = willBeDeviated;
	}

	getTodos() {
		return http.get(/*...*/)
			.then(data => { this.onSuccess(data) })
			.catch(err => { this.onError(err) });
	}
})

let todos = new Todos();

todos.onSuccess(data => {
	// ...
})

todos.onError(err => {
	// ...
})
```

Changelog
---------

Visit [Github Releases](https://github.com/clitetailor/deviation/releases) page for more information.