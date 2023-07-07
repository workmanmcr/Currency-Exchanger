import each from 'jest-each';
import Component from '../src/js/bs/Component';

/* Refer testing_guide.md */

describe("Component", () => {
    each()
    .test("statement", () => {
        const param = "";
        const expected = "";
        const component = new Component(param);
        expect(component || component.property).toBe(expected);
    })
})

/*
each() is for conducting a series of the same test with different inputs and expected results
Declaring the expected value or result is not necessary (can define in params for .match method)
Do not use the or: only an example between possible inputs
*/