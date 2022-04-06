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
        message: '请输入插件名(此名字会自动加上命名空间，作为npm包名)？',
        transformer: (name) => {
          console.log(name)
          return name.replace(/vuepress-/ig, '')
        }
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
        templateFile: 'templates/src/node/index.hbs'
      },
      {
        type: 'add',
        path: 'packages/{{name}}/.gitignore',
        templateFile: 'templates/.gitignore'
      },
      {
        type: 'add',
        path: 'packages/{{name}}/src/client/index.ts',
        templateFile: 'templates/src/client/index.hbs'
      },
      {
        type: 'add',
        path: 'packages/{{name}}/package.json',
        templateFile: 'templates/package.hbs',
        transform: (content, args) => {
          const name = args.name
          const reg = new RegExp(`@mr-huang\/${name}`, 'ig')
          return content.replace(reg, `@mr-huang\/vuepress-plugin-${name}`)
        }
      },
      {
        type: 'add',
        path: 'packages/{{name}}/README.md',
        templateFile: 'templates/README.hbs'
      },
      {
        type: 'add',
        path: 'packages/{{name}}/src/typings/index.ts',
        templateFile: 'templates/src/typings/index.hbs'
      },
      {
        type: 'add',
        path: 'packages/{{name}}/src/shared/index.ts',
        templateFile: 'templates/src/shared/index.hbs'
      },
      {
        type: 'add',
        path: 'packages/{{name}}/tsconfig.build.json',
        templateFile: 'templates/tsconfig.build.json'
      },
      {
        type: 'add',
        path: 'packages/{{name}}/tsconfig.cjs.json',
        templateFile: 'templates/tsconfig.cjs.json'
      },
      {
        type: 'add',
        path: 'packages/{{name}}/tsconfig.esm.json',
        templateFile: 'templates/tsconfig.esm.json'
      },
      // {
      //   type: 'append',
      //   path: 'docs/.vuepress/clientAppEnhance.ts',
      //   pattern: /(\/\/ -- APPSTART ITEMS HERE --)/gi,
      //   template: "import Sum{{hump name}} from '@sum-ui/{{name}}'"
      // },
      {
        type: 'append',
        path: 'tsconfig.build.json',
        pattern: /(\/\/ -- APPEND NEW PACKAGE --)/gi,
        template: "   { \"path\": \"./packages/{{name}}/tsconfig.build.json\" },"
      }
    ]
  })
}
