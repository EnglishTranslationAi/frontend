import {englishTaskCondition, englishTaskTemplate} from "@/baseEnglishTemplate";


export const createEnglishTemplate = (content:any) => {
return `
${englishTaskCondition}
${englishTaskTemplate}
'''${content}'''

`
}