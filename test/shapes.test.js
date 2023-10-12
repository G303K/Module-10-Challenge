const Shape = require("../lib/shape");

const testCases = [
  {
    desc: "should throw an error if input is empty",
    input: {},
    expectedErr: new Error("Input cannot be empty"),
  },
  {
    desc: "should throw error if logo text is longer than 3",
    input: { logoName: "john" },
    expectedErr: new Error("Logo text cannot be more than 3 characters"),
  },
  {
    desc: "should throw error if input is not a valid CSS color",
    input: { logoName: "Ted", textColour: "NotColour" },
    expectedErr: new Error(
      "Please enter a valid CSS color keyword or hex code"
    ),
  },
  {
    desc: "should throw an error if render() is called",
    input: { logoName: "Ted", textColour: "green", bgColour: "purple" },
    expectedErr: new Error("Child shapes must implement a render() method"),
    shouldRender: true,
  },
  {
    desc: "should add background color if it is a valid color",
    input: { logoName: "Ted", textColour: "green", logoColour: "purple" },
    expectedKey: "logoColour",
    expectedValue: "purple",
  },
  {
    desc: "should add text color if it is a valid color",
    input: { logoName: "Ted", textColour: "red", logoColour: "purple" },
    expectedKey: "textColour",
    expectedValue: "red",
  },
];

describe("Shape test suite", () => {
  for (const tc of testCases) {
    it(tc.desc, () => {
      if (tc.shouldRender) {
        expect(() => new Shape(tc.input).render()).toThrow(tc.expectedErr);
      } else if (tc.expectedErr) {
        expect(() => new Shape(tc.input)).toThrow(tc.expectedErr);
      } else {
        const shape = new Shape(tc.input);
        expect(shape[tc.expectedKey]).toBe(tc.expectedValue);
      }
    });
  }
});
