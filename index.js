const readPkg = require("read-pkg-up");
const { package: pkg } = readPkg.sync();
const enzyme = require("enzyme");
const elmToJSX = require("react-element-to-jsx-string").default;

module.exports = {
  name: "unexpected-enzyme",
  version: pkg.version,
  installInto: expect => {
    expect.addType({
      name: "ReactElement",
      identify: value => value["$$typeof"] === Symbol.for("react.element"),
      inspect: value => elmToJSX(value, { maxInlineAttributesLineLength: 80 }),
    });
    expect.addType({
      name: "EnzymeWrapper",
      identify: value =>
        value instanceof enzyme.ShallowWrapper ||
        value instanceof enzyme.ReactWrapper,
      inspect: value => value.debug(),
    });
    expect.addType({
      name: "EnzymeShallowWrapper",
      identify: value => value instanceof enzyme.ShallowWrapper,
      base: "EnzymeWrapper",
    });
    expect.addType({
      name: "EnzymeMountWrapper",
      identify: value => value instanceof enzyme.ReactWrapper,
      base: "EnzymeWrapper",
    });
    expect.addAssertion(
      "<ReactElement> [when] shallow rendered <assertion?>",
      (expect, subject) => expect.shift(enzyme.shallow(subject)),
    );
    expect.addAssertion(
      "<ReactElement> [when] mounted <assertion?>",
      (expect, subject) => expect.shift(enzyme.mount(subject)),
    );
    expect.addAssertion(
      "<EnzymeWrapper> to equal <ReactElement>",
      (expect, subject, pattern) => expect(subject.equals(pattern), "to be ok"),
    );
    expect.addAssertion(
      "<EnzymeWrapper> to contain match of <ReactElement>",
      (expect, subject, pattern) =>
        expect(subject.containsMatchingElement(pattern), "to be ok"),
    );
    expect.addAssertion(
      "<EnzymeWrapper> has children <assertion?>",
      (expect, subject) => expect.shift(subject.children()),
    );
    expect.addAssertion(
      "<EnzymeWrapper> has children matching selector <string|function> <assertion?>",
      (expect, subject, selector) => expect.shift(subject.children(selector)),
    );

    expect.addAssertion(
      "<EnzymeWrapper> [taking] node at <number> <assertion?>",
      (expect, subject, index) => expect.shift(subject.at(index)),
    );
    expect.addAssertion(
      "<EnzymeWrapper> [taking] child node at <number> <assertion?>",
      (expect, subject, index) => expect.shift(subject.childAt(index)),
    );
  },
};
