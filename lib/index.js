const willBeDeviated = {};

function isMethod(arg) {
	return typeof (arg) === 'function'
}

function deviate(Layer) {
	class Deviated {
		constructor(...args) {
			const superInstance = new Layer(...args);

			const properties = Object.getOwnPropertyNames(superInstance);

			const deviantProperties = properties.filter(property =>
				superInstance[property] === willBeDeviated);
			
			const normalProperties = properties.filter(property =>
				superInstance[property] !== willBeDeviated);

			const superMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(superInstance)).filter(property =>
				isMethod(superInstance[property])).filter(method => method !== 'constructor')

			for (const property of deviantProperties) {
				let listeners = [];

				this[property] = function (listener) {
					listeners = listeners.concat([listener]);

					return this;
				}

				superInstance[property] = function (...args) {
					for (const listener of listeners) {
						listener(...args)
					}
				}
			}
			
			for (const method of superMethods) {
				this[method] = (...args) => {
					return superInstance[method](...args);
				}
			}

			for (const property of normalProperties) {
				Object.defineProperty(this, property, {
					get: function () {
						return superInstance[property];
					},
					enumerable: true,
					configurable: true
				})
			}
		}
	}

	return Deviated;
}

module.exports = { willBeDeviated, deviate }