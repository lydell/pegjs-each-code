pegjs-each-code [![Build Status](https://travis-ci.org/lydell/pegjs-each-code.png?branch=master)](https://travis-ci.org/lydell/pegjs-each-code)
===============

`npm install pegjs-each-code`

```js
var eachCode = require("pegjs-each-code")

eachCode(ast, function(node, labels, ruleName) {
  // This function will be run once with `ast.initializer` (if it exists), and
  // then once for each node with a `code` property, such as “action”, “semantic
  // and” and “semantic not” nodes.
  //
  // `labels` is an array of all the labels that are available to the code snippet.
  //
  // `ruleName` is the name of the rule that the code snippet occurs in, or
  // `null` if `node` is the initializer.

  try {
    node.code = compile(node.code, {locals: labels})
  } catch (error) {
    throw new Error([ruleName, error.message, "{" + node.code + "}"].join("\n\n"))
  }
})
```


License
=======

[The X11 (“MIT”) License](LICENSE).
