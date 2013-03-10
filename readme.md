chai-helpers
============

A collection of various chai helper functions.

In Node.js, it is set up by calling `require('fzk-chai-helpers').addMethods(chai)`
before running any tests.

Currently, there are one helper:

-   approximate: Compared two objects recursively just as `deep.equal(actual)`,
    but does not require all values to be equal. It is perfect for testing that
    key values are present in an object, without requiring that no optional
    (or future) values are present.

    Example (all examples evaluate to passed):

        expect([ 1, 2, 3]).to.approximate([ 1, 2, 3, 4, 5 ])
        expect([ 1, 2, 3]).not.to.approximate([ 2, 3, 4, 5 ])
        expect({ a: 1, b: { c: 2 } })
            .to.approximate({ a: 1, b: { c: 2, d: 'some value' } })
