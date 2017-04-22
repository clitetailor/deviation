const willBeDeviated = {};

function isMethod(arg) {
	return typeof (arg) === 'function'
}

function deviate(Layer) {
	class Deviated {
		constructor(...props) {
			let superInstance = new Layer(...props);

			const properties = Object.getOwnPropertyNames(superInstance);

			const deviantProperties = properties.filter(property =>
				superInstance[property] === willBeDeviated);

			const superMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(superInstance)).filter(property =>
				isMethod(superInstance[property])).filter(method => method !== 'constructor')
			
			for (let property of deviantProperties) {
				let listeners = [];

				this[property] = function (listener) {
					listeners = listeners.concat([listener]);
				}

				superInstance[property] = function (...args) {
					for (let listener of listeners) {
						listener(...args)
					}
				}
			}
			
			for (let method of superMethods) {
				this[method] = (...props) => {
					return superInstance[method](...props);
				}
			}
		}
	}

	return Deviated;
}

module.exports = { willBeDeviated, deviate }