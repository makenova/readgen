# readgen

[![Build Status](https://travis-ci.org/makenova/readgen.svg?branch=master)](https://travis-ci.org/makenova/readgen)

🤖 Generate a README.md stub 🤖

## Install

```sh
npm install -g readgen
```

## Use

```sh
readgen --name readgen --author makenova --description "Generate a README.md stub" --repo_name readgen
```

`author` can be omitted if you have a file called `.readgen` in your home directory which has a JSON object with an `author` property.

You only need to provide the `repo_name` if it's different from the `name`. Otherwise it's the `name` with the spaces replaced by underscores.

## Bugs

Please report any bugs to: https://github.com/makenova/readgen/issues

## License

Licensed under the MIT License: https://opensource.org/licenses/MIT
