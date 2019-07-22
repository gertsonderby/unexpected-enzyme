const readPkg = require("read-pkg-up");
const { package: pkg } = readPkg.sync();
const enzyme = require("enzyme");

module.exports = {
  name: "unexpected-enzyme",
  version: pkg.version,
  installInto: expect => {
    expect.addType({
      name: "ReactElement",
      identify: value => value["$$typeof"] === Symbol.for("react.element")
    });
    expect.addType({
      name: "EnzymeWrapper",
      identify: value =>
        value instanceof enzyme.ShallowWrapper ||
        value instanceof enzyme.ReactWrapper
    });
    expect.addType({
      name: "EnzymeShallowWrapper",
      identify: value => value instanceof enzyme.ShallowWrapper,
      base: "EnzymeWrapper"
    });
    expect.addType({
      name: "EnzymeMountWrapper",
      identify: value => value instanceof enzyme.ReactWrapper,
      base: "EnzymeWrapper"
    });
  }
};
