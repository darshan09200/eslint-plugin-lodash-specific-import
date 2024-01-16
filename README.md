# eslint-plugin-lodash-specific-import

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
yarn add eslint -D
```

Next, install `eslint-plugin-lodash-specific-import`:

```sh
yarn add eslint-plugin-lodash-specific-import -D
```

## Usage

Add `lodash-specific-import` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "lodash-specific-import"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "lodash-specific-import/no-global": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                 | Description                            | 🔧 |
| :----------------------------------- | :------------------------------------- | :- |
| [no-global](docs/rules/no-global.md) | enforce method-specific lodash imports | 🔧 |

<!-- end auto-generated rules list -->
