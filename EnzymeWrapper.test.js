import React from "react";
import unexpected from "unexpected";
import unexpectedEnzyme from "./index";
import { shallow, mount } from "enzyme";

const expect = unexpected.clone();

// const TestContext = React.createContext({ a: 1, b: 2 });

// const TestCompF = () => <div />;

// class TestCompC extends React.Component {
//   render() {
//     return (
//       <TestContext.Consumer>
//         {({ a, b }) => (
//           <div>
//             a: {a}
//             <br />
//             b: {b}
//           </div>
//         )}
//       </TestContext.Consumer>
//     );
//   }
// }

describe("EnzymeWrapper", () => {
  let testExpect;
  beforeEach(() => {
    testExpect = unexpected.clone().use(unexpectedEnzyme);
  });

  it("identifies EnzymeWrapper", () =>
    expect(
      () => testExpect(shallow(<div />), "to be an", "EnzymeWrapper"),
      "not to throw",
    ));

  it("identifies EnzymeWrapper", () =>
    expect(
      () => testExpect(mount(<div />), "to be an", "EnzymeWrapper"),
      "not to throw",
    ));

  it("identifies EnzymeWrapper", () =>
    expect(() => testExpect(<div />, "to be an", "EnzymeWrapper"), "to throw"));

  describe("<EnzymeWrapper> [taking] node at <number> <assertion?>", () => {
    it("gets a wrapper with the numbered element in the subject shallow wrapper", () =>
      expect(
        () =>
          testExpect(
            <ul />,
            "shallow rendered",
            "node at",
            0,
            "to equal",
            <ul />,
          ),
        "not to throw",
      ));
    it("gets a wrapper with the numbered element in the subject mounted wrapper", () =>
      expect(
        () =>
          testExpect(
            <ul />,
            "mounted",
            "taking node at",
            0,
            "to equal",
            <ul />,
          ),
        "not to throw",
      ));
  });

  describe("<EnzymeWrapper> [taking] child node at <number> <assertion?>", () => {
    it("gets a wrapper with the numbered child element in the subject shallow wrapper", () =>
      expect(
        () =>
          testExpect(
            <ul>
              <li id="1" />
              <li id="2" />
              <li id="3" />
              <li id="4" />
            </ul>,
            "shallow rendered",
            "child node at",
            2,
            "to equal",
            <li id="3" />,
          ),
        "not to throw",
      ));
    it("gets a wrapper with the numbered child element in the subject mounted wrapper", () =>
      expect(
        () =>
          testExpect(
            <ul>
              <li id="1" />
              <li id="2" />
              <li id="3" />
              <li id="4" />
            </ul>,
            "mounted",
            "taking child node at",
            2,
            "to equal",
            <li id="3" />,
          ),
        "not to throw",
      ));
  });

  describe("<EnzymeWrapper> has children <assertion?>", () => {
    it("fetches the children of a shallow render", () =>
      testExpect(
        shallow(
          <ul>
            <li>Test1</li>
            <li>Test2</li>
            <li>Test3</li>
          </ul>,
        ),
        "has children",
      ).then(children =>
        expect(
          children.debug(),
          "to equal",
          "<li>\n" +
            "  Test1\n" +
            "</li>\n\n\n" +
            "<li>\n" +
            "  Test2\n" +
            "</li>\n\n\n" +
            "<li>\n" +
            "  Test3\n" +
            "</li>",
        ),
      ));

    it("fetches the children of a mount", () =>
      testExpect(
        mount(
          <ul>
            <li>Test1</li>
            <li>Test2</li>
            <li>Test3</li>
          </ul>,
        ),
        "has children",
      ).then(children =>
        expect(
          children.debug(),
          "to equal",
          "<li>\n" +
            "  Test1\n" +
            "</li>\n\n\n" +
            "<li>\n" +
            "  Test2\n" +
            "</li>\n\n\n" +
            "<li>\n" +
            "  Test3\n" +
            "</li>",
        ),
      ));
  });

  describe("<EnzymeWrapper> has children matching selector <string|function> <assertion?>", () => {
    it("fetches the children of a shallow render with css selector", () =>
      testExpect(
        shallow(
          <ul>
            <li className="red">Test1</li>
            <li className="green">Test2</li>
            <li className="blue">Test3</li>
          </ul>,
        ),
        "has children matching selector",
        ".green",
      ).then(children =>
        expect(
          children.debug(),
          "to equal",
          '<li className="green">\n  Test2\n</li>',
        ),
      ));

    it("fetches the children of a shallow render with component selector", () => {
      const Li = ({ ...props }) => <li {...props} />;
      return testExpect(
        shallow(
          <ul>
            <Li>Test1</Li>
            <li>Test2</li>
            <li>Test3</li>
          </ul>,
        ),
        "has children matching selector",
        Li,
      ).then(children =>
        expect(children.debug(), "to equal", "<Li>\n  Test1\n</Li>"),
      );
    });

    it("fetches the children of a shallow render with displayname selector", () => {
      const Li = ({ ...props }) => <li {...props} />;
      return testExpect(
        shallow(
          <ul>
            <Li>Test1</Li>
            <li>Test2</li>
            <li>Test3</li>
          </ul>,
        ),
        "has children matching selector",
        "Li",
      ).then(children =>
        expect(children.debug(), "to equal", "<Li>\n  Test1\n</Li>"),
      );
    });

    it("fetches the children of a mount with css selector", () =>
      testExpect(
        mount(
          <ul>
            <li className="red">Test1</li>
            <li className="green">Test2</li>
            <li className="blue">Test3</li>
          </ul>,
        ),
        "has children matching selector",
        ".green",
      ).then(children =>
        expect(
          children.debug(),
          "to equal",
          '<li className="green">\n  Test2\n</li>',
        ),
      ));

    it("fetches the children of a mount with component selector", () => {
      const Li = ({ ...props }) => <li {...props} />;
      return testExpect(
        mount(
          <ul>
            <Li>Test1</Li>
            <li>Test2</li>
            <li>Test3</li>
          </ul>,
        ),
        "has children matching selector",
        Li,
      ).then(children =>
        expect(
          children.debug(),
          "to equal",
          "<Li>\n  <li>\n    Test1\n  </li>\n</Li>",
        ),
      );
    });

    it("fetches the children of a mount with displayname selector", () => {
      const Li = ({ ...props }) => <li {...props} />;
      return testExpect(
        mount(
          <ul>
            <Li>Test1</Li>
            <li>Test2</li>
            <li>Test3</li>
          </ul>,
        ),
        "has children matching selector",
        "Li",
      ).then(children =>
        expect(
          children.debug(),
          "to equal",
          "<Li>\n  <li>\n    Test1\n  </li>\n</Li>",
        ),
      );
    });
  });

  // closest(selector)
  // containsAllMatchingElements(nodes)
  // containsAnyMatchingElements(nodes)

  describe("<EnzymeWrapper> to contain match of <ReactElement>", () => {
    it("checks for a matching component in the wrapper", () =>
      testExpect(
        shallow(
          <ul>
            <li>One</li>
            <li foo={true}>2</li>
            <li>
              <a href="#3">Three</a>
            </li>
          </ul>,
        ),
        "to contain match of",
        <li>2</li>,
      ));

    it("fails if no match", () =>
      expect(
        () =>
          testExpect(
            shallow(
              <ul>
                <li>One</li>
                <li>2</li>
                <li>
                  <a href="#3">Three</a>
                </li>
              </ul>,
            ),
            "to contain match of",
            <li>1</li>,
          ),
        "to throw",
        "expected\n" +
          "<ul>\n" +
          "  <li>\n" +
          "    One\n" +
          "  </li>\n" +
          "  <li>\n" +
          "    2\n" +
          "  </li>\n" +
          "  <li>\n" +
          '    <a href="#3">\n' +
          "      Three\n" +
          "    </a>\n" +
          "  </li>\n" +
          "</ul>\n" +
          "to contain match of\n" +
          "<li>\n" +
          "  1\n" +
          "</li>",
      ));
  });

  describe("<EnzymeWrapper> to contain <ReactElement>", () => {
    it("checks for the exact component in the wrapper", () =>
      testExpect(
        shallow(
          <ul>
            <li>One</li>
            <li foo={true}>2</li>
            <li>
              <a href="#3">Three</a>
            </li>
          </ul>,
        ),
        "to contain",
        <li foo={true}>2</li>,
      ));

    it("fails if match not exact", () =>
      expect(
        () =>
          testExpect(
            shallow(
              <ul>
                <li>One</li>
                <li foo={true}>2</li>
                <li>
                  <a href="#3">Three</a>
                </li>
              </ul>,
            ),
            "to contain",
            <li>2</li>,
          ),
        "to throw",
        "expected\n" +
          "<ul>\n" +
          "  <li>\n" +
          "    One\n" +
          "  </li>\n" +
          "  <li foo={true}>\n" +
          "    2\n" +
          "  </li>\n" +
          "  <li>\n" +
          '    <a href="#3">\n' +
          "      Three\n" +
          "    </a>\n" +
          "  </li>\n" +
          "</ul>\n" +
          "to contain\n" +
          "<li>\n" +
          "  2\n" +
          "</li>",
      ));

    it("fails if children don't match", () =>
      expect(
        () =>
          testExpect(
            shallow(
              <ul>
                <li>One</li>
                <li>2</li>
                <li>
                  <a href="#3">Three</a>
                </li>
              </ul>,
            ),
            "to contain",
            <li></li>,
          ),
        "to throw",
        "expected\n" +
          "<ul>\n" +
          "  <li>\n" +
          "    One\n" +
          "  </li>\n" +
          "  <li>\n" +
          "    2\n" +
          "  </li>\n" +
          "  <li>\n" +
          '    <a href="#3">\n' +
          "      Three\n" +
          "    </a>\n" +
          "  </li>\n" +
          "</ul>\n" +
          "to contain <li />",
      ));
  });

  // context([key])
  // debug()

  describe("<EnzymeWrapper> to equal <ReactElement>", () => {
    it("checks that the subject is identical to the passed element (shallow)", () =>
      expect(
        () =>
          testExpect(
            shallow(<div id="foo" name="bar" />),
            "to equal",
            <div id="foo" name="bar" />,
          ),
        "not to throw",
      ));
    it("checks that the subject is identical to the passed element (mount)", () =>
      expect(
        () =>
          testExpect(
            mount(<div id="foo" name="bar" />),
            "to equal",
            <div id="foo" name="bar" />,
          ),
        "not to throw",
      ));

    it("fails if not identical props (shallow)", () =>
      expect(
        () =>
          testExpect(
            shallow(<div id="foo" name="bar" />),
            "to equal",
            <div id="bar" name="foo" />,
          ),
        "to throw",
        'expected <div id="foo" name="bar" /> to equal <div id="bar" name="foo" />',
      ));
    it("fails if not identical children (shallow)", () =>
      expect(
        () =>
          testExpect(
            shallow(
              <div id="foo" name="bar">
                <div id="insider" />
              </div>,
            ),
            "to equal",
            <div id="foo" name="bar" />,
          ),
        "to throw",
        "expected\n" +
          '<div id="foo" name="bar">\n' +
          '  <div id="insider" />\n' +
          "</div>\n" +
          'to equal <div id="foo" name="bar" />',
      ));
    it("fails if not identical props (mount)", () =>
      expect(
        () =>
          testExpect(
            mount(<div id="foo" name="bar" />),
            "to equal",
            <div id="bar" name="foo" />,
          ),
        "to throw",
        'expected <div id="foo" name="bar" /> to equal <div id="bar" name="foo" />',
      ));
    it("fails if not identical children (mount)", () =>
      expect(
        () =>
          testExpect(
            mount(
              <div id="foo" name="bar">
                <div id="insider" />
              </div>,
            ),
            "to equal",
            <div id="foo" name="bar" />,
          ),
        "to throw",
        "expected\n" +
          '<div id="foo" name="bar">\n' +
          '  <div id="insider" />\n' +
          "</div>\n" +
          'to equal <div id="foo" name="bar" />',
      ));
  });

  // every(selector)
  // everyWhere(predicate)
  // exists([selector])
  // filter(selector)
  // filterWhere(predicate)
  // find(selector)
  // findWhere(predicate)
  // first()
  // forEach(fn)
  // get(index)
  // getWrappingComponent()
  // hasClass(className)
  // hostNodes()
  // html()
  // instance()
  // invoke(propName)
  // isEmpty()
  // isEmptyRender()
  // is(selector)
  // key()
  // last()
  // map(fn)
  // matchesElement(node)
  // name()
  // not(selector)
  // parent()
  // parents()
  // prop(key)
  // props()
  // reduce(fn[, initialValue])
  // reduceRight(fn[, initialValue])
  // render()
  // renderProp(key)
  // setContext(context)
  // setState(nextState[, callback])
  // simulateError(error)
  // simulate(event[, data])
  // slice([begin[, end]])
  // some(selector)
  // someWhere(predicate)
  // state([key])
  // tap(intercepter)
  // text()
  // type()
  // unmount()
  // update()
});
