describe('unit/approximate.js', function() {
	var approx = require('../../src/approximate').compare
	describe('When expecting an array', function() {
		describe('with nested values', function() {
			var expected = [ [ 1 ] ]
			it('should return true if nested is exact match', function() {
				expect(approx(expected, [ [ 1 ], 2 ]))
					.to.equal(true)
			})
			it('should return true if nested contains more items', function() {
				expect(approx(expected, [ [ 1, 2 ], 3 ]))
					.to.equal(true)
			})
		})
		describe('with values', function() {
			var expected = [ 1, 'a', null, undefined ]
			it('should return false if order is wrong', function() {
				expect(approx(expected, [ 'a', null, 1 ])).to.equal(false)
			})
			it('should return true for an equal array', function() {
				expect(approx(expected, [ 1, 'a', null, undefined ])).to.equal(true)
			})
			it('should return true for an array-like object', function() {
				expect(approx(expected, { length: 4, '0': 1, '1': 'a', '2': null, '3': undefined })).to.equal(true)
			})
			it('should return false for an object', function() {
				expect(approx(expected, { '0': 1, '1': 'a', '2': null, '3': undefined })).to.equal(false)
			})
			it('should return false for a string', function() {
				expect(approx(expected, 'abc')).to.equal(false)
			})
			it('should return false for a number', function() {
				expect(approx(expected, 123)).to.equal(false)
			})
			it('should return true for an array', function() {
				expect(approx(expected, [ 1, 2, 3 ])).to.equal(false)
			})
			it('should return false for null', function() {
				expect(approx(expected, null)).to.equal(false)
			})
			it('should return false for undefined', function() {
				expect(approx(expected, undefined)).to.equal(false)
			})
			it('should return false for a bool', function() {
				expect(approx(expected, true)).to.equal(false)
			})
		})
		describe('that is empty', function() {
			var expected = []
			it('should return false for an object', function() {
				expect(approx(expected, { a: 1, b: 2 })).to.equal(false)
			})
			it('should return false for a string', function() {
				expect(approx(expected, 'abc')).to.equal(false)
			})
			it('should return false for a number', function() {
				expect(approx(expected, 123)).to.equal(false)
			})
			it('should return true for an array-like object', function() {
				expect(approx(expected, { length: 3, '0': 'a', '1': 'b', '2': 'c' })).to.equal(true)
			})
			it('should return true for an array', function() {
				expect(approx(expected, [ 1, 2, 3 ])).to.equal(true)
			})
			it('should return false for null', function() {
				expect(approx(expected, null)).to.equal(false)
			})
			it('should return false for undefined', function() {
				expect(approx(expected, undefined)).to.equal(false)
			})
			it('should return false for a bool', function() {
				expect(approx(expected, true)).to.equal(false)
			})
		})
	})
	describe('When expecting an object', function() {
		describe('with nested values', function() {
			var expected = { a: [ 1 ], b: { c: 2 } }
			it('should return true for a proper nested object', function() {
				expect(approx(expected, { a: [ 1, 2 ], not: 'in order', b: { c: 2, d: 3 } }))
					.to.equal(true)
			})
		})
		describe('that is an array-like', function() {
			var expected = { length: 2, '0': 'a', '1': 'b' }
			it('should approximate an array', function() {
				expect(approx(expected, [ 'a', 'b' ])).to.equal(true)
			})
		})
		describe('that contains items', function() {
			var expected = { a: 1, b: 2 }
			it('should return true for an object', function() {
				expect(approx(expected, { a: 1, b: 2, c: 3 })).to.equal(true)
			})
			it('should return false for an array', function() {
				expect(approx(expected, [ 1, 2, 3 ])).to.equal(false)
			})
		})
		describe('that is empty', function() {
			var expected = {}
			it('should return true for an object', function() {
				expect(approx(expected, { a: 1, b: 2, c: 3 })).to.equal(true)
			})
			it('should return false for a string', function() {
				expect(approx(expected, 'abc')).to.equal(false)
			})
			it('should return false for a number', function() {
				expect(approx(expected, 123)).to.equal(false)
			})
			// The reasoning is that an array can resemble the expected object
			it('should return true for an array', function() {
				expect(approx(expected, [ 1, 2, 3 ])).to.equal(true)
			})
			it('should return false for null', function() {
				expect(approx(expected, null)).to.equal(false)
			})
			it('should return false for undefined', function() {
				expect(approx(expected, undefined)).to.equal(false)
			})
			it('should return false for a bool', function() {
				expect(approx(expected, true)).to.equal(false)
			})
		})
	})
})
