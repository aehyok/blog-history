import { writerLog } from "./sql-helper.mjs"
import { baseUrl } from "./common.mjs";
import { $ } from 'zx'

export const gitPush = async() => {
    const { name } = global.project
    const path = baseUrl + name
    await gitPushBy(name)
}

export const gitPushBy = async(name: string) => {
    try {
        const releasePath = baseUrl + 'release';
        await writerLog(name, `git push start`, global.version);
        // const message=`build：前端${name} -- commit-version:${global.version}`
        const message=`$chore: ${name}::commit-version-${global.version}`
        const result = await $`cd ${releasePath}; git add . ; sleep 3; git commit -m ${message}; git push origin;`
        if(result && result.exitCode === 0 ) {
            await writerLog(name, `git push end success`, global.version);
        } else {
            await writerLog(name, `git push error: ${result.stderr}`, global.version); 
        }
    } catch (error){
        console.log(error, 'error')
        if(error.stdout.includes('nothing to commit, working tree clean')) {
            await writerLog(name, `git push nothing to commit`, global.version);
        }
        await writerLog(name, `git push error`, global.version);
    }
} 

