const willBeDeviated = {};

function isMethod(arg) {
	return typeof (arg) === 'function'
}

function deviate(Layer) {
	class Barrier {
		constructor(...args) {
			const layer = new Layer(...args);

			const properties = Object.getOwnPropertyNames(layer);

			const deviantProperties = properties.filter(property =>
				layer[property] === willBeDeviated);
			
			const layerMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(layer))
				.filter(property => isMethod(layer[property]))
				.filter(method => method !== 'constructor')

			for (const property of deviantProperties) {
				let listeners = [];

				this[property] = function (listener) {
					listeners = listeners.concat([listener]);

					function unsubscribe() {
						listeners = listeners.filter(_listener =>
							_listener !== listener)
					}

					return { unsubscribe };
				}

				layer[property] = function (...args) {
					for (const listener of listeners) {
						listener(...args)
					}
				}
			}
			
			for (const method of layerMethods) {
				this[method] = (...args) => {
					return layer[method](...args);
				}
			}

			this.__proto__ = layer;
		}
	}

	return Barrier;
}

module.exports = { willBeDeviated, deviate }