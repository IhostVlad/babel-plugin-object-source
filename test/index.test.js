'use strict'

var babelPluginObjectSource = require('../index')
var fs = require('fs')
var path = require('path')
var babel6 = require('babel-core')
var babel7 = require('@babel/core')

var filename = path.join(__dirname, './gauge-code.js')

describe('Babel-plugin-object-source', function() {
  it('should work fine with babel 6', function() {
    var inputCode = fs.readFileSync(filename)

    var result = babel6.transform(inputCode, {
      filename: 'gauge-code.js',
      plugins: [babelPluginObjectSource]
    })

    var outputCode = result.code

    expect(outputCode).toMatchSnapshot()
  })

  it('should work fine with babel 7', function() {
    var inputCode = fs.readFileSync(filename)

    var result = babel7.transform(inputCode, {
      filename: 'gauge-code.js',
      plugins: [babelPluginObjectSource]
    })

    var outputCode = result.code

    expect(outputCode).toMatchSnapshot()
  })
})
