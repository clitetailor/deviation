Deviation
=========

> Manage the deviation between model layers.

Getting Started
---------------

```javascript
import { willBeDeviated, deviate } from 'deviation'

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
deviated.dispatch()
```