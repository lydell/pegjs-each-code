// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

var eachNode = require("pegjs-each-node")

function eachCode(ast, callback) {
  if (ast.initializer) {
    callback(ast.initializer, [], null)
  }

  ast.rules.forEach(function(rule) {
    eachNode(rule.expression, function(node, parent) {
      if ("code" in node) {
        callback(node, getLabels(node, parent), rule.name)
      }
    }, rule)
  })
}

function getLabels(node, parent) {
  var container = node.expression || parent
  if (container.type === "sequence") {
    return container.elements
      .filter(function(child) {
        return (child.type === "labeled")
      })
      .map(function(child) {
        return child.label
      })
  } else {
    return ("label" in container ? [container.label] : [])
  }
}

module.exports = eachCode
