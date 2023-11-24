import { ChatCompletionMessageParam } from "openai/resources/chat/completions";


export const sendMessage = async (messages: ChatCompletionMessageParam[]) => {
    console.log('Send',messages)
    try {
        const response = await fetch('api/createMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages }),
        })
        const data = await response.json();

        return {data}
    } catch (error) {
        console.log('RR Error here')
        console.log(error)
    }
}