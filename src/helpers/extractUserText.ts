// @ts-ignore
export const extractUserText = (inputString) => {
    const regex = /'''(.*?)'''/s;
    const match = inputString.match(regex);
    return match ? match[1] : null;
}