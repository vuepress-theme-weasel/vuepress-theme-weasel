//@ts-ignore
const execa = require('execa')
/**
 * Get unix timestamp in milliseconds of the first commit
 */
export const getCreatedTime = async (
  filePath: string,
  cwd: string
): Promise<number> => {
  //@ts-ignore
  const { stdout } = await execa('git', ['--no-pager', 'log', '--diff-filter=A', '--format=%at', filePath], { cwd }
  ).catch((e: Error) => {
    console.log(e)
    throw e
  })

  return Number.parseInt(stdout, 10) * 1000
}
