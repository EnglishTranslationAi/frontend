'use client'
import {ChatCompletionMessageParam} from "openai/resources/chat/completions";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'

import {sendMessage} from "@/utils/sendMessage";
import {createEnglishTemplate} from "@/helpers/createEnglishTemplate";

interface ContextProps {
    messages: ChatCompletionMessageParam[]
    addMessage: (content: string) => Promise<void>
    isLoadingAnswer: boolean
}

const ChatsContext = createContext<ContextProps>({} as ContextProps);

export function MessagesProvider({children}: { children: ReactNode }) {

    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([])
    const [isLoadingAnswer, setIsLoadingAnswer] = useState(false)
    useEffect(() => {
        const initializeChat = () => {
            const systemMessage: ChatCompletionMessageParam = {
                role: 'system',
                content: 'You are ChatGPT, a large language model trained by OpenAI.',
            }
            const welcomeMessage: ChatCompletionMessageParam = {
                role: 'assistant',
                content: 'Hi, How can I help you today?',

            }
            setMessages([systemMessage, welcomeMessage])
        }
        // When no messages are present, we initialize the chat the system message and the welcome message
        // We hide the system message from the user in the UI
        if (!messages?.length) {
            initializeChat()
        }
    }, [messages?.length, setMessages])

    const addMessage = async (content: string) => {
        setIsLoadingAnswer(true)
        console.log('Content', content)
        const newContent = createEnglishTemplate(content)
        try {
            const newMessage: ChatCompletionMessageParam = {
                role: 'user',
                content: newContent,
            }
            const newMessages = [...messages, newMessage]
            // Add the user message to the state so we can see it immediately
            setMessages(newMessages)
            // @ts-ignore
            const {data} = await sendMessage(newMessages)
            const reply = data.choices[0].message

            // Add the assistant message to the state
            setMessages([...newMessages, reply])
        } catch (error) {
            // Show error when something goes wrong
            console.log({title: 'An error occurred', type: 'error'})
        } finally {
            setIsLoadingAnswer(false)
        }
    }
    return (
        <ChatsContext.Provider value={{messages, addMessage, isLoadingAnswer}}>
            {children}
        </ChatsContext.Provider>
    );
}

export const useMessages = () => {
    return useContext(ChatsContext) as ContextProps
}