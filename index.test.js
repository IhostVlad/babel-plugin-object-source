"use strict";

var babel = require("babel-core");
var babelPluginObjectSource = require("./index");
var fs = require("fs");

var filename = "./gauge-code.js";

describe("Babel-plugin-object-source", function() {
  it("should work fine", function() {
    var inputCode = fs.readFileSync(filename);

    var result = babel.transform(inputCode, {
      filename: filename,
      plugins: [babelPluginObjectSource]
    });

    var outputCode = result.code;

    expect(outputCode).toMatchSnapshot();
  });
});
