module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "enforce method-specific lodash imports",
      category: "Best Practices",
      recommended: false,
    },
    fixable: "code",
    schema: [],
    messages: {
      invalidImport:
        "Use method-specific lodash imports instead of importing from the full lodash package.",
      invalidDefaultImport:
        "Default lodash imports are not allowed. Use method-specific imports instead.",
    },
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value !== "lodash") {
          return;
        }
        const hasDefaultImport = node.specifiers.some(
          (specifier) => specifier.type === "ImportDefaultSpecifier"
        );

        if (hasDefaultImport) {
          // Report an error for default imports
          context.report({
            node,
            messageId: "invalidDefaultImport",
          });
          return; // Exit after handling default import
        }
        const hasNonDestructuredImports = node.specifiers.some(
          (specifier) => specifier.type === "ImportSpecifier"
        );
        if (!hasNonDestructuredImports) {
          return;
        }
        if (node.importKind === "value") {
          const imports = node.specifiers
            .filter(
              (specifier) =>
                specifier.type === "ImportSpecifier" &&
                specifier.importKind !== "type"
            )
            .map(
              (specifier) =>
                `import ${specifier.imported.name} from 'lodash/${specifier.imported.name}';`
            );

          if (imports.length > 0) {
            context.report({
              node,
              messageId: "invalidImport",
              fix(fixer) {
                return fixer.replaceText(node, imports.join("\n"));
              },
            });
          }
        }
      },
      VariableDeclarator(node) {
        if (
          node.init &&
          node.init.type === "CallExpression" &&
          node.init.callee.name === "require" &&
          node.init.arguments.length === 1 &&
          node.init.arguments[0].type === "Literal" &&
          node.init.arguments[0].value === "lodash"
        ) {
          if (node.id.type === "ObjectPattern") {
            context.report({
              node,
              messageId: "invalidImport",
            });
          } else if (node.id.type === "Identifier") {
            context.report({
              node,
              messageId: "invalidDefaultImport",
            });
          }
        }
      },
    };
  },
};
