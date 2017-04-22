let { willBeDeviated, deviate } = require('../lib/index');
let should = require('chai').should;
should();

suite("#main features' test", function () {
	test('#1', function () {

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
			msg.should.equal('done!')
		})
		deviated.dispatch()
	})
})