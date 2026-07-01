## Domain Specific Languages (Syntax)

### Glossary

To better understand this section, it helps to know the following terms:

- **String:** A sequence of characters.
- **Character:** A single text symbol such as `a`, `1`, `亃`, or `╝`. More precisely, a single Unicode code point.

Jumpedia defines several **DSLs** (**Domain Specific Languages**). A DSL is a small text-based language designed for entering structured information in a compact way.

<div class="callout" data-type="example">
<strong>Example</strong>

- To specify multiple aliases in a single command parameter, Jumpedia uses the `value list` syntax.
- To assign multiple values to each attribute of a task, Jumpedia uses the `key to value list mapping` syntax.
</div>

### Design Goals

When designing the DSLs, we tried to balance four main goals:

1. **Simplicity**

   A DSL should only be as complex as necessary. Unnecessary symbols and complexity should be avoided.

2. **Consistency**

   Different DSLs should share as much syntax as possible to reduce the learning curve.

3. **Ease of Typing**

   The number of special characters should be kept as low as possible, especially for mobile users.

4. **Ease of Reading**

   DSLs should remain easy to read in any context. In many cases, there are multiple valid ways to express the same thing, allowing users to choose whichever is easier to read or type.

## Common Features

Although every DSL has its own purpose, they all share several common syntax rules.

### Tokens

The first step when processing your input is to split the text into smaller meaningful pieces called **tokens**.

You can think of a token as one "building block" of your input. Words, quoted strings, and symbols such as `(` or `>=` are all tokens.

The component that performs this step is called the **lexer**. It reads your input from left to right and identifies each token.

<div class="callout" data-type="example">
<strong>Example:</strong>

In the `filter` DSL, the string

```text
(name >= "Cool " and alias is not _)
```

is split into the following tokens (simplified):

```text
(         → SymbolToken("(")
name      → IdentifierToken("name")
>=        → SymbolToken(">=")
"Cool "   → StringToken("Cool ")
and       → IdentifierToken("and")
alias     → IdentifierToken("alias")
is        → IdentifierToken("is")
not       → IdentifierToken("not")
_         → IdentifierToken("_")
)         → SymbolToken(")")
```
</div>

### Token Types

There are three kinds of tokens.

#### Symbol

A symbol is one of a predefined set of special character sequences. Symbols never contain letters, numbers, or underscores.

The currently supported symbols are:

```text
( ) < <= > >= + , :
```

#### Identifier

An identifier is a sequence of letters, numbers, or underscores (`_`).

Examples:

```text
name
alias_2
Player123
```

#### String

A string is text enclosed in either single (`'`) or double (`"`) quotation marks.

Strings are used whenever the text contains spaces or other special characters.

Some characters must be escaped with a backslash (`\`):

```text
\\  →  \
\'  →  '
\"  →  "
\n  →  newline (only allowed in template syntax)
```

In almost every DSL, **identifiers** and **strings** can be used interchangeably.

Identifiers are shorter and easier to type, but they can only contain letters, numbers, and underscores.

Whenever spaces or special characters are needed, use a string instead.

<div class="callout" data-type="example">
<strong>Example:</strong>

These two values are equivalent:

```text
hello
```

```text
"hello"
```

However, the following value contains a space, so it must be written as a string:

```text
"hello world"
```
</div>

### Parsing

After the input has been split into tokens, Jumpedia checks whether those tokens form a valid expression according to the rules of the selected DSL.

This step is called **parsing**.

Instead of looking at individual tokens, the parser looks at how the tokens fit together. The internal details are not important for using the DSLs, but two concepts are useful to understand.

#### One Parser Per DSL

While all DSLs share the same lexer, each DSL has its own parser.

This means that the same sequence of tokens can have different meanings depending on which DSL is being used.

<div class="callout" data-type="example">
<strong>Example:</strong>

The `value list` DSL simply interprets consecutive values as a list.

The `filter` DSL interprets tokens as logical expressions, comparisons, and nested conditions.

Although both DSLs receive the same kinds of tokens, each parser interprets them differently.
</div>

#### Keywords

Some identifiers have a special meaning within a DSL. These reserved words are called **keywords**.

If an identifier exactly matches one of a DSL's keywords, it is treated as that keyword rather than ordinary text.

String tokens are **never** interpreted as keywords.

<div class="callout" data-type="example">
<strong>Example:</strong>

In the `filter` DSL, the identifiers

```text
is
not
_
```

are keywords.

If you actually want the text `is`, write it as a string instead:

```text
"is"
```
</div>

Keywords must match **exactly**.

<div class="callout" data-type="example">
<strong>Example:</strong>

The identifier

```text
island
```

is treated as a normal identifier.

It is **not** interpreted as the keyword `is` followed by the identifier `land`.
</div>