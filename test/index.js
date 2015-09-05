// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

var fs = require('fs')
var path = require('path')
var pegjs = require('pegjs')
var expect = require('chai').expect

var eachCode = require('../')

function test (grammar, expected) {
  var pass = function (ast) {
    var index = 0
    eachCode(ast, function (node, labels, ruleName) {
      expect([node.code, labels, ruleName]).to.deep.equal(expected[index])
      index++
    })
    expect(index).to.equal(expected.length)
  }

  var plugin = {
    use: function (config) {
      config.passes.transform.unshift(pass)
    }
  }

  pegjs.buildParser(grammar, {plugins: [plugin], output: 'source'})
}

function read (file) {
  return fs.readFileSync(path.join('test', file)).toString()
}

describe('eachCode', function () {
  it('is a function', function () {
    expect(eachCode).to.be.a('function')
  })

  it('runs the callback with each code node', function () {
    test(read('grammar.pegjs'), [
      [' action 1 ', [], 'Rule'],
      ['action 3', ['a', 'b'], 'Rule'],
      [' return f ', ['f'], 'Rule'],
      [' return true ', [], 'Foo'],
      [' return false ', ['space'], 'Bar'],
      [' return !false ', [], 'Baz'],
      ['\n    return text()\n  ', [], 'Nested'],
      [' return num + zero ', ['num', 'zero'], 'Nested'],
      ['one', ['one'], 'Nested'],
      ['two', ['two'], 'Nested']
    ])
  })
})

describe('eachCode.getFilePosition', function () {
  it('is a function', function () {
    expect(eachCode.getFilePosition).to.be.a('function')
  })

  it('returns node-relative position relative to the entire file', function () {
    // Note: these examples are taken from grammar.pegjs.

    var node1 = {location: {start: {line: 4, column: 24}}}
    var error1 = {line: 1, column: 9}
    expect(eachCode.getFilePosition(node1, error1)).to.deep.equal(
      {line: 4, column: 33}
    )

    var node2 = {location: {start: {line: 19, column: 85}}}
    var error2 = {line: 2, column: 12}
    expect(eachCode.getFilePosition(node2, error2)).to.deep.equal(
      {line: 20, column: 12}
    )
  })
})
