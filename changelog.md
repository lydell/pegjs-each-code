### Version 0.3.0 (2015-09-05) ###

- Added: `eachCode.getFilePosition()`. Requires pegjs 0.9.0.

### Version 0.2.0 (2014-08-01) ###

- Changed: The initializer (if any) is now always ignored.
  (Backwards-incompatible change.)

#### Why not the initializer? ####

- It is, as opposed to the other nodes, not an implicit function.
- It hasn’t got labels to access.
- It is not part of a rule.

In other words, it is a totally different kind of code snippet, that don’t fit
with the rest, and usually therefore requires different handling (I found that
I used lots of `if (node.type === 'initializer')`). Since there may only be one
initializer, it is easy enough to just do something to `ast.initializer`. KISS.


### Version 0.1.0 (2014-07-31) ###

- Initial release.
