import React from "react";
import unexpected from "unexpected";
import unexpectedEnzyme from "./index";
import { shallow, mount } from "enzyme";

const expect = unexpected.clone();

describe("EnzymeShallowWrapper", () => {
  let testExpect;
  beforeEach(() => {
    testExpect = unexpected.clone().use(unexpectedEnzyme);
  });

  it("identifies EnzymeShallowWrapper", () =>
    expect(
      () => testExpect(shallow(<div />), "to be an", "EnzymeShallowWrapper"),
      "not to throw",
    ));
  it("identifies EnzymeShallowWrapper", () =>
    expect(
      () => testExpect(mount(<div />), "to be an", "EnzymeShallowWrapper"),
      "to throw",
    ));
  it("identifies EnzymeShallowWrapper", () =>
    expect(
      () => testExpect(<div />, "to be an", "EnzymeShallowWrapper"),
      "to throw",
    ));

  // dive()
  // getElement(index)
  // getElements(index)
  // setProps(nextProps)
  // shallow([options])
});
