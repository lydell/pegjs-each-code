Rule
  = label:"foo"
  / 'foo'i { action 1 }
  / a:. b:(Space f:Foo { return f })* !Space &Foo {action 3}

Foo
  = . & { return true }

Bar "bar"
  = $. space:Space ! { return false }

Baz
  = & { return !false }

Space
  = [ \t]

Nested
  = ("a" (num:(one:"1" {one} / two:"2" {two}) zero:"0" { return num + zero })+ "b") {
    return text()
  }
