
const transform = (...args) => {
  const pkgName = args[1].name
  return pkgName.replace(/vuepress-/ig, '')
}

module.exports = plop => {
  plop.setHelper('weasel', function (text) {
      return text.replace(text[0], text[0].toUpperCase())
  })
  plop.setGenerator('component', {
    description: '创建新的插件',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '请输入插件名(此名字会自动加上命名空间，作为npm包名)？'
      }
    ],
    actions: [
      // {
      //   type: 'add',
      //   path: 'packages/{{name}}/__tests__/{{name}}.spec.ts',
      //   templateFile: 'templates/__tests__/index.spec.hbs'
      // },
      {
        type: 'add',
        path: 'packages/{{name}}/src/node/index.ts',
        templateFile: 'templates/src/node/index.hbs',
        transform
      },
      {
        type: 'add',
        path: 'packages/{{name}}/.gitignore',
        templateFile: 'templates/.gitignore',
        transform
      },
      {
        type: 'add',
        path: 'packages/{{name}}/src/client/index.ts',
        templateFile: 'templates/src/client/index.hbs',
        transform
      },
      {
        type: 'add',
        path: 'packages/{{name}}/package.json',
        templateFile: 'templates/package.hbs',
        transform
      },
      {
        type: 'add',
        path: 'packages/{{name}}/README.md',
        templateFile: 'templates/README.hbs',
        transform
      },
      {
        type: 'add',
        path: 'packages/{{name}}/src/typings/index.ts',
        templateFile: 'templates/src/typings/index.hbs',
        transform
      },
      {
        type: 'add',
        path: 'packages/{{name}}/src/shared/index.ts',
        templateFile: 'templates/src/shared/index.hbs',
        transform
      },
      {
        type: 'add',
        path: 'packages/{{name}}/tsconfig.build.json',
        templateFile: 'templates/tsconfig.build.json',
        transform
      },
      {
        type: 'add',
        path: 'packages/{{name}}/tsconfig.cjs.json',
        templateFile: 'templates/tsconfig.cjs.json',
        transform
      },
      {
        type: 'add',
        path: 'packages/{{name}}/tsconfig.esm.json',
        templateFile: 'templates/tsconfig.esm.json',
        transform
      },
      {
        type: 'add',
        path: 'packages/{{name}}/rollup.config.js',
        templateFile: 'templates/rollup.config.hbs',
        transform
      },
      // {
      //   type: 'append',
      //   path: 'docs/.vuepress/clientAppEnhance.ts',
      //   pattern: /(\/\/ -- APPSTART ITEMS HERE --)/gi,
      //   template: "import Sum{{hump name}} from '@sum-ui/{{name}}'"
      // },
      {
        type: 'append',
        path: 'tsconfig.json',
        pattern: /(\/\/ -- APPEND NEW PACKAGE --)/gi,
        template: "   { \"path\": \"./packages/{{name}}/tsconfig.build.json\" },",
        transform
      }
    ]
  })
}
