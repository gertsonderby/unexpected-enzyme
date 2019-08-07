import React from "react";
import unexpected from "unexpected";
import unexpectedEnzyme from "./index";
import { shallow, mount } from "enzyme";

const expect = unexpected.clone();

const TestFuncComp = () => <div />;
class TestClassComp extends React.Component {
  render() {
    return <div />;
  }
}

describe("ReactElement", () => {
  let testExpect;
  beforeEach(() => {
    testExpect = unexpected.clone().use(unexpectedEnzyme);
  });

  it("identifies ReactElement", () =>
    expect(
      () => testExpect(<div />, "to be a", "ReactElement"),
      "not to throw",
    ));
  it("identifies ReactElement", () =>
    expect(
      () => testExpect(<TestFuncComp />, "to be a", "ReactElement"),
      "not to throw",
    ));
  it("identifies ReactElement", () =>
    expect(
      () => testExpect(<TestClassComp />, "to be a", "ReactElement"),
      "not to throw",
    ));
  it("identifies ReactElement", () =>
    expect(() => testExpect("<div/>", "to be a", "ReactElement"), "to throw"));
  it("identifies ReactElement", () =>
    expect(
      () => testExpect({ $$type: "react.element" }, "to be a", "ReactElement"),
      "to throw",
    ));
  it("identifies ReactElement", () =>
    expect(
      () => testExpect(shallow(<div />), "to be a", "ReactElement"),
      "to throw",
    ));
  it("identifies ReactElement", () =>
    expect(
      () => testExpect(mount(<div />), "to be a", "ReactElement"),
      "to throw",
    ));

  describe("<ReactElement> [when] shallow rendered <assertion?>", () => {
    it("shallow renders the given React element", () =>
      testExpect(
        <div>This is a test</div>,
        "when shallow rendered",
        "to be an",
        "EnzymeShallowWrapper",
      ));

    it("'when' is optional", () =>
      testExpect(
        <div>This is a test</div>,
        "shallow rendered",
        "to be an",
        "EnzymeShallowWrapper",
      ));
  });

  describe("<ReactElement> [when] mounted <assertion?>", () => {
    it("fully renders the given React element", () =>
      testExpect(
        <div>This is a test</div>,
        "when mounted",
        "to be an",
        "EnzymeMountWrapper",
      ));

    it("'when' is optional", () =>
      testExpect(
        <div>This is a test</div>,
        "mounted",
        "to be an",
        "EnzymeMountWrapper",
      ));
  });
});
