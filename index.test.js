import React from "react";
import sinon from "sinon";
import unexpected from "unexpected";
import unexpectedSinon from "unexpected-sinon";
import unexpectedEnzyme from "./index";
import { shallow, mount, render, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const expect = unexpected.clone().use(unexpectedSinon);

describe("Unexpected Enzyme plugin", () => {
  it("is a plugin", () =>
    expect(unexpectedEnzyme, "to be an object").and("to satisfy", {
      name: expect.it("to be a string"),
      version: expect.it("to be a string").and("to match", /^\d+.\d+.\d+/),
      installInto: expect.it("to be a function")
    }));

  describe("installInto", () => {
    let mockExpect;
    beforeEach(() => {
      mockExpect = sinon.spy().named("expect");
      mockExpect.addType = sinon.spy().named("expect.addType");
    });

    it("adds types to recognize React elements and enzyme wrappers", () =>
      expect(unexpectedEnzyme.installInto, "called with", [mockExpect]).then(
        () => {
          expect(mockExpect, "was not called");
          expect(mockExpect.addType, "to have a call satisfying", {
            args: [
              {
                name: "ReactElement",
                identify: expect.it("to be a function")
              }
            ]
          });
          expect(mockExpect.addType, "to have a call satisfying", {
            args: [
              {
                name: "EnzymeWrapper",
                identify: expect.it("to be a function")
              }
            ]
          });
          expect(mockExpect.addType, "to have a call satisfying", {
            args: [
              {
                name: "EnzymeShallowWrapper",
                identify: expect.it("to be a function"),
                base: "EnzymeWrapper"
              }
            ]
          });
          expect(mockExpect.addType, "to have a call satisfying", {
            args: [
              {
                name: "EnzymeMountWrapper",
                identify: expect.it("to be a function"),
                base: "EnzymeWrapper"
              }
            ]
          });
        }
      ));
  });

  describe("plugin types", () => {
    let testExpect;
    beforeEach(() => {
      testExpect = unexpected.clone().use(unexpectedEnzyme);
    });

    describe("ReactElement", () => {
      it("identifies ReactElement", () =>
        expect(
          () => testExpect(<div />, "to be a", "ReactElement"),
          "not to throw"
        ));
      it("identifies ReactElement", () =>
        expect(
          () => testExpect("<div/>", "to be a", "ReactElement"),
          "to throw"
        ));
      it("identifies ReactElement", () =>
        expect(
          () =>
            testExpect({ $$type: "react.element" }, "to be a", "ReactElement"),
          "to throw"
        ));
      it("identifies ReactElement", () =>
        expect(
          () => testExpect(shallow(<div />), "to be a", "ReactElement"),
          "to throw"
        ));
      it("identifies ReactElement", () =>
        expect(
          () => testExpect(mount(<div />), "to be a", "ReactElement"),
          "to throw"
        ));
    });

    describe("EnzymeShallowWrapper", () => {
      it("identifies EnzymeShallowWrapper", () =>
        expect(
          () => testExpect(shallow(<div />), "to be a", "EnzymeShallowWrapper"),
          "not to throw"
        ));
      it("identifies EnzymeShallowWrapper", () =>
        expect(
          () => testExpect(mount(<div />), "to be a", "EnzymeShallowWrapper"),
          "to throw"
        ));
      it("identifies EnzymeShallowWrapper", () =>
        expect(
          () => testExpect(<div />, "to be a", "EnzymeShallowWrapper"),
          "to throw"
        ));
    });

    describe("EnzymeMountWrapper", () => {
      it("identifies EnzymeMountWrapper", () =>
        expect(
          () => testExpect(mount(<div />), "to be a", "EnzymeMountWrapper"),
          "not to throw"
        ));
      it("identifies EnzymeMountWrapper", () =>
        expect(
          () => testExpect(shallow(<div />), "to be a", "EnzymeMountWrapper"),
          "to throw"
        ));
      it("identifies EnzymeMountWrapper", () =>
        expect(
          () => testExpect(<div />, "to be a", "EnzymeMountWrapper"),
          "to throw"
        ));
    });

    // describe('EnzymeStaticWrapper', () => {
    //   it('identifies EnzymeStaticWrapper', () => expect(() => testExpect(render(<div/>), 'to be a', 'EnzymeStaticWrapper'), 'not to throw'));
    //   it('identifies EnzymeStaticWrapper', () => expect(() => testExpect(mount(<div/>), 'to be a', 'EnzymeStaticWrapper'), 'to throw'));
    //   it('identifies EnzymeStaticWrapper', () => expect(() => testExpect(shallow(<div/>), 'to be a', 'EnzymeStaticWrapper'), 'to throw'));
    //   it('identifies EnzymeStaticWrapper', () => expect(() => testExpect(<div/>, 'to be a', 'EnzymeStaticWrapper'), 'to throw'));
    // });
  });
});
