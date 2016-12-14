var assert = require('assert');

describe('Test que fallan [Remoto]', function () {
	describe('1) test 1 OK', function () {
		it('should return -1 when the value is not present', function () {
			assert.equal(-1, [1, 2, 3].indexOf(4));
		});
	});

	describe('2) test 2 ERROR', function () {
		it('should return the index when the value is present', function () {
			assert.equal(-1, [1, 2, 3].indexOf(2));
		});
	});
});