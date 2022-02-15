function sum(a, b) {
    return a + b;
}
module.exports = sum;

/*
参考：https://github.com/facebook/jest

yarn add --dev jest
touch sum.js
touch sum.test.js

sum.jsを以下の内容に
    function sum(a, b) {
        return a + b;
    }
    module.exports = sum;

sum.test.jsを以下の内容に
    const sum = require('./sum');

    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });


package.jsonに以下を追加
    {
        "scripts": {
            "test": "jest"
        }
    }

yarn test
*/ 