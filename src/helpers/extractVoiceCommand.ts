const commands = {
    stop: ['stop recording', 'останови запис', 'стоп запис', 'останови запись', 'прекрати запись','стоп-запис'],
    start: ['start recording', 'начни запись', 'розпочати запис','розпочни запис','розпочне запис','розпочний запис','начни записувати','ввімкни запис', 'увімкни запис']
}

// @ts-ignore
export const extractVoiceCommand = (word) => {
    let wordToLowerCase = word.toLowerCase()
    if (commands.stop.includes(wordToLowerCase)) {
        return 'stop';
    }
    if (commands.start.includes(wordToLowerCase)) {
        return 'start';
    }
}