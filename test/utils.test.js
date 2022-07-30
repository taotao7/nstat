const assert = require("assert");
const mocha = require("mocha");
const { getAuthorCommitString } = require("../dist/utils");

const test = mocha.test;
const suite = mocha.suite;

//utilsTest case
suite("utils test", function () {
  test("get commit col", () => {
    getAuthorCommitString();
  });

  test("throw time format error", () => {
    try {
      getAuthorCommitString("2222-2334-2", "22455");
    } catch (e) {
      assert(
        e ===
          "The date entered does not conform to the specification e.g. 2022-01-01"
      );
    }
  });
});
