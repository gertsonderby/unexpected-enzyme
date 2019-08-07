import React from "react";
import unexpected from "unexpected";
import unexpectedEnzyme from "./index";
import { shallow, mount } from "enzyme";

const expect = unexpected.clone();

describe("EnzymeMountWrapper", () => {
  let testExpect;
  beforeEach(() => {
    testExpect = unexpected.clone().use(unexpectedEnzyme);
  });

  it("identifies EnzymeMountWrapper", () =>
    expect(
      () => testExpect(mount(<div />), "to be an", "EnzymeMountWrapper"),
      "not to throw",
    ));
  it("identifies EnzymeMountWrapper", () =>
    expect(
      () => testExpect(shallow(<div />), "to be an", "EnzymeMountWrapper"),
      "to throw",
    ));
  it("identifies EnzymeMountWrapper", () =>
    expect(
      () => testExpect(<div />, "to be an", "EnzymeMountWrapper"),
      "to throw",
    ));

  // detach()
  // getDOMNode()
  // mount()
  // ref(refName)
  // setProps(nextProps[, callback])
});
