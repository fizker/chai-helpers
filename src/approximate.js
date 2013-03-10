module.exports =
{ compare: compare
, addMethods: addMethod
}

function addMethod(chai) {
	chai.Assertion.addChainableMethod('approximate', function(expected) {
		var actual = this.__flags.object
		  , msg = JSON.stringify(actual)
		this.assert(
			compare(expected, actual),
			'expected '+msg+' to approximate #{exp}',
			'expected '+msg+' not to approximate #{exp}',
			expected
		)
	})
}

function compare(expected, actual) {
	if(typeof(actual) !== typeof(expected)) return false
	if(typeof(expected) !== 'object' || expected == null) {
		return expected === actual
	}
	if(!!expected && !actual) {
		return false
	}

	if(Array.isArray(expected)) {
		if(typeof(actual.length) !== 'number') {
			return false
		}
		var aa = Array.prototype.slice.call(actual)
		return expected.every(function(exp) {
			return aa.some(function(act) {
				return compare(exp, act)
			})
		})
	}

	return Object.keys(expected).every(function(key) {
		var eo = expected[key]
		  , ao = actual[key]
		if(typeof(eo) === 'object' && eo !== null && ao !== null) {
			return compare(eo, ao)
		}
		return ao === eo
	})
}
