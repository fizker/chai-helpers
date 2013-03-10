module.exports =
{ addMethods: addMethods
}

var approx = require('./src/approximate')

function addMethods(chai) {
	approx.addMethods(chai)
}
