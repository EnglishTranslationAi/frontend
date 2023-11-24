
export const extractUserText = (inputString:any) => {
    const regex = /'''(.*?)'''/s;
    const match = inputString.match(regex);
    return match ? match[1] : null;
}