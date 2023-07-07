# **Testing Guide**

**Reminder**: Do not forget to rename your tests accordingly. ```Component.test.js``` is just a sample title for a test file. Replace Component with the module you are testing. Often the module will be in your src folder as ```Component.js```. For example: ```Pizza.test.js``` is the corresponding test file for ```Pizza.js```.

## **Steps in a Test**

Component (in this guide) refers to either a function, class or constructor being tested.

1. Either declare inputs, beforeeach-defined, or param sets from parameterized.
2. Call component to do something with inputs and produce a result.
3. Test result against expected value(s).

Outline:
```js
describe("ComponentName", () => {

    let component_variable;
    const component_constant;

    beforeEach(() => { /* ...init */ })
    afterEach(() => { /* ...reset || clear */ })

    each([params]).test('statement', () => {
        ...
        expect(result).match(value)
    })
})
```

**Naming Conventions**
Note that the first presented is the conventional or often standard way. Other ways are by preference only. My personal preference is using underscores.

- variables: variableName, variable_name, or _variableName
  - apply to primitives, object literals and arrays
- constants
  - global, class scope or module scope: CONSTANTNAME or CONSTANT_NAME
  - function scope or variables: constantName or constant_name
- class or constructor: ClassName
- function: functionName or function_name

**Matchers**
```toBe(expected)```: exact equality using Object.is
```not(expected)```: opposite of toBe()
- expects a result not to be the expected
```toEqual(expected)```: exact equality for objects and arrays by recursively checking every field
- ignores object keys with undefined properties, undefined array items, array sparseness, or object type mismatch
```toStrictEqual(expected)```: exact quality including ignores in toEqual()
```toContain(expected)```: check if an array or iterable contains a particular item
```toBeCloseTo(expected)```: floating point equality to avoid rounding errors

Refer to [docs](https://jestjs.io/docs/using-matchers) for other matchers to specifically target Truthiness (testing booleans), Strings, and Exceptions.

## **Parameterized Testing**

Using jest-each
For more, refer [documentation](https://www.npmjs.com/package/jest-each)

Instead of writing a test for each case and scenario of a single function, parameterized testing allows us to think of the possible parameters instead and the output or data we expect with each execution.

### **Format**

```js
each([params]).test('test statement', (params) => { expect().match() })
```

A match is for one comparison. If you want to compare multiple variables, either use object params and returns in your code and test against an object, or write multiple expect.match expressions for each comparison.

Refer Matchers section above to see possible match methods.

### **Using an array of parameter sets**

**Example: each([ [params] ])**
```js
[
    [val1, val2, val3],
    [val1, val2, val3],
    ...
]
```

[] contains params for tests and [ [] ] contains params for a test instance.

Inside test:
```js
each([[params]]).test('returns %s when given %s and %s', (expected, a, b) => {
    ...
    expect(component(a,b)).toBe(expected);
});
```
%s represents value in parameters following the order of array holding params.


**Example: each\`paramstable\`**
```js
`
    varName | varName   | expected
    ${val1} | ${val2}   | ${val3}
    ${val1} | ${val2}   | ${val3}
    ...
`
```

At least one varName should be expected, or either result or output, but the word expected is more clear and relevant to the purpose of testing.

No need for parens to surround template literal. Tabbing and spaces do not make a difference, but rows and order do.

```js
each`paramstable`.test('returns $expected when given $varName and $varName', ({ varName, varName, expected }) => {
    ...
    expect(component(a, b)).toBe(expected);
});
```

Note that the test statement uses quotations, not backticks.

Destructure in function params to access each value by a name. However, can also do obj.varName, obj.varName and obj.expected instead.

**Example: each([ {params} ])**
```js
[
    { var1: val1, var2: val2, expected: val3 },
    { var1: val1, var2: val2, expected: val3 },
    ...
]
```

Use in the same manner as paramstable:
```js
each([ {params} ]).test('returns %expected when given %varName and $varName', ({ varName, varName, expected }) => {
    expect(component(a, b)).toBe(expected);
});