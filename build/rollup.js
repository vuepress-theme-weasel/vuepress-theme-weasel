import path from 'path'
import commonjs from "@rollup/plugin-commonjs"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import json from '@rollup/plugin-json'
import typescript from "@rollup/plugin-typescript"
import typescript2 from "rollup-plugin-typescript2"
import rollupCopy from "rollup-plugin-copy"
import dts from "rollup-plugin-dts"
import vue from "rollup-plugin-vue"
import { terser } from "rollup-plugin-terser"
import styles from "rollup-plugin-styles"
import { DEFAULT_EXTENSIONS } from '@babel/core'
// import babel from '@rollup/plugin-babel'

const isProduction = process.env.mode === "production"

/**
 * 打包ts文件
 * @param {*} filePath 文件相对路径
 * @param {*} param1
 * @returns
 */
export const buildTs = (
  filePath,
  {
    // 剥离第三方依赖
    external = [],
    // 第三方.d.ts依赖剥离
    dtsExternal = [],
    // 是否编译样式
    useStyle = false,
    // 使用resolve
    resolve = true,
    // 需要拷贝的文件
    copy = [],
    // 额外的ts配置
    // tsconfig = {},
    // 输出配置
    output = {},
    // 是否同文件输出.d.ts
    inlineDynamicImports = true
  } = {}
) => {
  const pkgPath = process.cwd()
  const pkg = require(path.resolve(pkgPath, 'package.json'))
  const inputFile = path.resolve(pkgPath, `src/${filePath}.ts`)
  const outFormat = filePath.startsWith("node/") ? "cjs" : "esm"
  console.log(inputFile + '当前输出=>', outFormat)
  return [
    {
      input: inputFile,
      output: [
        {
          // file: path.resolve(pkgPath, pkg.main),
          file: `./lib/${filePath}.js`,
          format: outFormat,
          sourcemap: !isProduction,
          exports: "named",
          ...output,
        },
      ],
      plugins: [
        typescript({
          tsconfig: path.resolve(pkgPath, `./tsconfig.json`),
          sourceMap: !isProduction
        }),
        // 编译样式文件 https://www.npmjs.com/package/rollup-plugin-styles
        ...(useStyle ? [styles()] : []),
        ...(resolve ? [nodeResolve({ preferBuiltins: true }), commonjs()] : []),
        json(),
        // babel({
        //   exclude: 'node_modules/**',
        //   babelHelpers: 'runtime',
        //   configFile: path.resolve(process.cwd(), '../../babel.config.js'),
        //   // babel 默认不支持 ts 需要手动添加
        //   extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx', '.vue']
        // }),
        ...(isProduction ? [terser()] : []),
        ...(copy.length
          ? [
              rollupCopy({
                targets: copy.map((item) =>
                  typeof item === "string"
                    ? { src: `./src/${item}`, dest: `./lib/${item}` }
                    : { src: `./src/${item[0]}`, dest: `./lib/${item[1]}` }
                ),
              }),
            ]
          : []),
      ],
      onwarn: function (warning) {
        if (warning.code === 'THIS_IS_UNDEFINED' || warning.code === 'CIRCULAR_DEPENDENCY') {
          return
        }
        console.error(`(!) ${warning.message}`)
      },
      inlineDynamicImports,
      external,
      treeshake: {
        unknownGlobalSideEffects: false,
      },
    },
    {
      input: `./src/${filePath}.ts`,
      output: [{ file: `./lib/${filePath}.d.ts`, format: "esm" }],
      plugins: [dts()],
      external: dtsExternal,
    },
  ]
}

/**
 * vue文件打包配置函数
 * @param {*} filePath 文件相对路径
 * @param {*} param1
 * @returns
 */
export const buildVue = (
  filePath,
  {
    // 是否开启生成d.ts
    dts: enableDts = true,
    // 剥离第三方依赖
    external = [],
    // 第三方.d.ts依赖剥离
    dtsExternal = [],
    // 是否编译样式
    useStyle = false,
    // 使用resolve
    resolve = false,
    // 需要拷贝的文件
    copy = [],
    // 输出配置
    output = {},
    // 是否同文件输出.d.ts
    inlineDynamicImports = true
  } = {}
) => {
  const temp = filePath.split(".")
  const ext = temp.pop()
  const filename = temp.join(".")

  return [
    {
      input: `./src/${filePath}`,
      output: [
        {
          file: `./lib/${filename}.js`,
          format: filePath.includes("/node/") ? "cjs" : "esm",
          sourcemap: !isProduction,
          exports: "named",
          ...output,
        },
      ],
      plugins: [
        vue(),
        typescript2({
          tsconfigOverride: {
            compilerOptions: {
              declaration: false,
              declarationMap: false,
              sourceMap: !isProduction
            },
          },
        }),
        ...(useStyle ? [styles()] : []),
        ...(resolve ? [nodeResolve({ preferBuiltins: true }), commonjs()] : []),
        json(),
        // babel({
        //   exclude: 'node_modules/**',
        //   babelHelpers: 'runtime',
        //   configFile: path.resolve(process.cwd(), '../../babel.config.js'),
        //   // babel 默认不支持 ts 需要手动添加
        //   extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx', '.vue']
        // }),
        ...(isProduction ? [terser()] : []),
        ...(copy.length
          ? [
              rollupCopy({
                targets: copy.map((item) =>
                  typeof item === "string"
                    ? { src: `./src/${item}`, dest: `./lib/${item}` }
                    : { src: `./src/${item[0]}`, dest: `./lib/${item[1]}` }
                ),
              }),
            ]
          : []),
      ],
      onwarn: function (warning) {
        if (warning.code === 'THIS_IS_UNDEFINED' || warning.code === 'CIRCULAR_DEPENDENCY') {
          return
        }
        console.error(`(!) ${warning.message}`)
      },
      inlineDynamicImports,
      external,
      treeshake: {
        unknownGlobalSideEffects: false,
      },
    },
    ...(ext === "ts" && enableDts
      ? [
          {
            input: `./src/${filePath}`,
            output: [{ file: `./lib/${filename}.d.ts`, format: "esm" }],
            plugins: [dts()],
            external: dtsExternal,
            onwarn: function (warning) {
              if (warning.code === 'THIS_IS_UNDEFINED' || warning.code === 'CIRCULAR_DEPENDENCY') {
                return
              }
              console.error(`(!) ${warning.message}`)
            },
          },
        ]
      : []),
  ]
}

/**
 * 根据配置创建 rollup 配置
 * @param {Array<{
    type: 'ts',
    filePath: '',
    options: {
     // 剥离第三方依赖
      external: [],
      // 第三方.d.ts依赖剥离
      dtsExternal: [],
      // 是否编译样式
      useStyle: false,
      // 使用resolve
      resolve: false,
      // 需要拷贝的文件
      copy: [],
      // 额外的ts配置
      // tsconfig = {},
      // 输出配置
      output: {},
      // 是否同文件输出.d.ts
      inlineDynamicImports: true
   }
  }>} configs
 */
export const buildConfig = (configs = []) => {
  const config = []
  configs.forEach(item => {
    if (item.type === 'ts') {
      config.push(...buildTs(item.filePath, item.options))
    }
    if (item.type === 'vue') {
      config.push(...buildVue(item.filePath, item.options))
    }
  })
  console.log('===============================', config)
  return config
}
