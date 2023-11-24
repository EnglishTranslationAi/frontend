import {englishTaskCondition, englishTaskTemplate} from "@/baseEnglishTemplate";

// @ts-ignore
export const createEnglishTemplate = (content) => {
return `
${englishTaskCondition}
${englishTaskTemplate}
'''${content}'''

`
}