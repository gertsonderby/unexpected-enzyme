import unexpected from "unexpected";
import unexpectedEnzyme from "./index";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const expect = unexpected.clone();

describe("Unexpected Enzyme plugin", () => {
  it("is a plugin", () =>
    expect(unexpectedEnzyme, "to be an object").and("to satisfy", {
      name: expect.it("to be a string"),
      version: expect.it("to be a string").and("to match", /^\d+.\d+.\d+/),
      installInto: expect.it("to be a function"),
    }));
});
