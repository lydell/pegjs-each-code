**DEPRECATED.** Use `peg.compiler.visitor` added in [PEG.js 0.10.0] instead.

[PEG.js 0.10.0]: https://github.com/pegjs/pegjs/blob/4a49e910ac6b57c9cd2362f997ac24df529fcebb/CHANGELOG.md#minor-changes


pegjs-each-code [![Build Status](https://travis-ci.org/lydell/pegjs-each-code.svg?branch=master)](https://travis-ci.org/lydell/pegjs-each-code)
===============

`npm install pegjs-each-code`

```js
var eachCode = require('pegjs-each-code')

eachCode(ast, function(node, labels, ruleName) {
  try {
    node.code = compile(node.code, {locals: labels})
  } catch (error) {
    var pos = eachCode.getFilePosition(node, error)
    throw new Error('Line ' + pos.line + ', column ' + pos.column +
                    ' (in rule "' + ruleName + '"): ' + error.message)
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

If such a processor throws an error, use `eachCode.getFilePosition(node, {line:
Number, column: Number})` to make the line and column of the error relative to
the entire file, rather than to `node` (the code snippet). It returns an object
with a `line` and a `column` property.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)


License
=======

[The X11 (“MIT”) License](LICENSE).
