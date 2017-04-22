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

		deviated.onClick(function (msg) {
			msg.should.equal('done!')
		})

		deviated.onClick(function (msg) {
			msg.should.equal('done!')
		})

		deviated.dispatch()
	})

	test('#2', function () {

		class SuperClass {
			constructor() {
				this.onClick = willBeDeviated;

				this.toggle = false;
			}

			dispatch() {
				this.toggle = true;
			}
		}

		let Deviated = deviate(SuperClass);

		let deviated = new Deviated();

		deviated.onClick(function (msg) {
			deviated.toggle.should.equal(true);
		})
		deviated.dispatch()
	})

	test('#3', function (done) {

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

		deviated.onClick(function (msg) {
			msg.should.equal('done!');
			done();
		})

		new Promise(function (resolve) {
			setTimeout(function () {
				resolve();
			}, 1000)
		})
			.then(function () {
				deviated.dispatch();
			})
			.catch(function (err) {
				done(err)
			});
	})

	test('#4', function (done) {
		let Deviated = deviate(class {
			constructor() {
				this.onClick = willBeDeviated;
			}

			dispatch() {
				this.onClick('done!')
			}
		});

		let deviated = new Deviated();

		deviated.onClick(function (msg) {
			msg.should.equal('done!');
			done();
		})

		new Promise(function (resolve) {
			setTimeout(function () {
				resolve();
			}, 1000)
		})
			.then(function () {
				deviated.dispatch();
			})
			.catch(function (err) {
				done(err)
			});
	})

	test('#5', function (done) {
		let Deviated = deviate(class {
			constructor() {
				this.onClick = willBeDeviated;
			}

			dispatch() {
				this.onClick('done!')
			}
		});

		let deviated = new Deviated();

		deviated.onClick(function (msg) {
			msg.should.equal('done!');
		}).onClick(function (msg) {
			msg.should.equal('done!');
			done();
		})

		new Promise(function (resolve) {
			setTimeout(function () {
				resolve();
			}, 1000)
		})
			.then(function () {
				deviated.dispatch();
			})
			.catch(function (err) {
				done(err)
			});
	})
})