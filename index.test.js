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
      mockExpect.addAssertion = sinon.spy().named("expect.addAssertion");
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

          expect(mockExpect.addAssertion, "to have a call satisfying", {
            args: [
              "<ReactElement> [when] shallow rendered <assertion?>",
              expect.it("to be a function")
            ]
          });
          expect(mockExpect.addAssertion, "to have a call satisfying", {
            args: [
              "<EnzymeWrapper> to contain match of <ReactElement>",
              expect.it("to be a function")
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

      describe("<ReactElement> [when] shallow rendered <assertion?>", () => {
        it("shallow renders the given React element", () =>
          testExpect(
            <div>This is a test</div>,
            "when shallow rendered",
            "to be an",
            "EnzymeShallowWrapper"
          ));

        it("'when' is optional", () =>
          testExpect(
            <div>This is a test</div>,
            "shallow rendered",
            "to be an",
            "EnzymeShallowWrapper"
          ));
      });
    });

    describe("EnzymeWrapper", () => {
      it("identifies EnzymeWrapper", () =>
        expect(
          () => testExpect(shallow(<div />), "to be an", "EnzymeWrapper"),
          "not to throw"
        ));
      it("identifies EnzymeWrapper", () =>
        expect(
          () => testExpect(mount(<div />), "to be an", "EnzymeWrapper"),
          "not to throw"
        ));
      it("identifies EnzymeWrapper", () =>
        expect(
          () => testExpect(<div />, "to be an", "EnzymeWrapper"),
          "to throw"
        ));

      describe("<EnzymeWrapper> to contain match of <ReactElement>", () => {
        it("checks for a matching component in the wrapper", () =>
          testExpect(
            shallow(
              <ul>
                <li>One</li>
                <li>2</li>
                <li>
                  <a href="#3">Three</a>
                </li>
              </ul>
            ),
            "to contain match of",
            <li>2</li>
          ));

        it("fails if no match", () =>
          expect(() => testExpect(
            shallow(
              <ul>
                <li>One</li>
                <li>2</li>
                <li>
                  <a href="#3">Three</a>
                </li>
              </ul>
            ),
            "to contain match of",
            <li>1</li>
          ), "to throw", "expected\n" +
          "<ul>\n" +
          "  <li>\n" +
          "    One\n" +
          "  </li>\n" +
          "  <li>\n" +
          "    2\n" +
          "  </li>\n" +
          "  <li>\n" +
          "    <a href=\"#3\">\n" +
          "      Three\n" +
          "    </a>\n" +
          "  </li>\n" +
          "</ul>\n" +
          "to contain match of\n" +
          "<li>\n" +
          "  1\n" +
          "</li>"));
      });
    });

    describe("EnzymeShallowWrapper", () => {
      it("identifies EnzymeShallowWrapper", () =>
        expect(
          () =>
            testExpect(shallow(<div />), "to be an", "EnzymeShallowWrapper"),
          "not to throw"
        ));
      it("identifies EnzymeShallowWrapper", () =>
        expect(
          () => testExpect(mount(<div />), "to be an", "EnzymeShallowWrapper"),
          "to throw"
        ));
      it("identifies EnzymeShallowWrapper", () =>
        expect(
          () => testExpect(<div />, "to be an", "EnzymeShallowWrapper"),
          "to throw"
        ));
    });

    describe("EnzymeMountWrapper", () => {
      it("identifies EnzymeMountWrapper", () =>
        expect(
          () => testExpect(mount(<div />), "to be an", "EnzymeMountWrapper"),
          "not to throw"
        ));
      it("identifies EnzymeMountWrapper", () =>
        expect(
          () => testExpect(shallow(<div />), "to be an", "EnzymeMountWrapper"),
          "to throw"
        ));
      it("identifies EnzymeMountWrapper", () =>
        expect(
          () => testExpect(<div />, "to be an", "EnzymeMountWrapper"),
          "to throw"
        ));
    });
  });
});
