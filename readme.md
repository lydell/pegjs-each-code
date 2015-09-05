pegjs-each-code [![Build Status](https://travis-ci.org/lydell/pegjs-each-code.png?branch=master)](https://travis-ci.org/lydell/pegjs-each-code)
===============

`npm install pegjs-each-code`

```js
var eachCode = require("pegjs-each-code")

eachCode(ast, function(node, labels, ruleName) {
  try {
    node.code = compile(node.code, {locals: labels})
  } catch (error) {
    throw new Error([ruleName, error.message, "{" + node.code + "}"].join("\n\n"))
  }
})
```

- The function passed to `eachCode` will be run once for each node with a
  `code` property, such as “action”, “semantic and” and “semantic not” nodes,
  [except the initializer](changelog.md#why-not-the-initializer).

- `labels` is an array of all the labels that are available to the code
  snippet.

- `ruleName` is the name of the rule that the code snippet occurs in.

`eachCode` is useful when making a plugin for a compile-to-js language (such as
CoffeeScript and TypeScript) or a linter.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)


License
=======

[The X11 (“MIT”) License](LICENSE).
