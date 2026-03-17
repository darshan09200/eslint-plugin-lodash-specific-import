module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "enforce method-specific lodash imports",
      category: "Best Practices",
      recommended: true,
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
    const sourceCode = context.sourceCode || context.getSourceCode();

    function getImportedName(specifier) {
      if (!specifier.imported) {
        return null;
      }
      if (specifier.imported.type === "Identifier") {
        return specifier.imported.name;
      }
      if (specifier.imported.type === "Literal" && typeof specifier.imported.value === "string") {
        return specifier.imported.value;
      }
      return null;
    }

    return {
      ImportDeclaration(node) {
        if (node.source.value !== "lodash" && node.source.value !== "lodash-es") {
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
        if (node.importKind && node.importKind !== "value") {
          return;
        }
        const valueSpecifiers = node.specifiers.filter(
          (specifier) =>
            specifier.type === "ImportSpecifier" &&
            specifier.importKind !== "type"
        );
        const typeSpecifiers = node.specifiers.filter(
          (specifier) =>
            specifier.type === "ImportSpecifier" &&
            specifier.importKind === "type"
        );
        const imports = [];

        for (const specifier of valueSpecifiers) {
          const importedName = getImportedName(specifier);
          const localName =
            specifier.local && specifier.local.type === "Identifier"
              ? specifier.local.name
              : null;
          if (!importedName || !localName) {
            context.report({
              node,
              messageId: "invalidImport",
            });
            return;
          }
          imports.push(`import ${localName} from '${node.source.value}/${importedName}';`);
        }

        if (typeSpecifiers.length > 0) {
          const typeSpecifierText = typeSpecifiers.map((specifier) => sourceCode.getText(specifier)).join(", ");
          imports.push(`import { ${typeSpecifierText} } from '${node.source.value}';`);
        }

        if (valueSpecifiers.length > 0) {
          context.report({
            node,
            messageId: "invalidImport",
            fix(fixer) {
              return fixer.replaceText(node, imports.join("\n"));
            },
          });
        }
      },
      VariableDeclarator(node) {
        if (
          node.init &&
          node.init.type === "CallExpression" &&
          node.init.callee.name === "require" &&
          node.init.arguments.length === 1 &&
          node.init.arguments[0].type === "Literal" &&
          (node.init.arguments[0].value === "lodash" || node.init.arguments[0].value === "lodash-es")
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
