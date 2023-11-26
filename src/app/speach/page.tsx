'use client'
import "regenerator-runtime"
// @ts-ignore
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import {useEffect, useState} from "react";

const IndexPage = () => {
    const [speechRecognitionSupported, setSpeechRecognitionSupported] =
        useState(null) // null or boolean
    const commands = [
        {
            command: 'reset',
            callback: () => resetTranscript()
        },
        {
            command: 'shut up',
            callback: () => setMessage('I wasn\'t talking.')
        },
        {
            command: 'Hello',
            callback: () => setMessage('Hi there!')
        },
    ]

    // @ts-ignore
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({commands})

    useEffect(() => {
        // sets to true or false after component has been mounted
        setSpeechRecognitionSupported(browserSupportsSpeechRecognition)
    }, [browserSupportsSpeechRecognition])

    if (speechRecognitionSupported === null) return null // return null on first render, can be a loading indicator

    if (!speechRecognitionSupported) {
        return <span>Browser does not support speech recognition.</span>
    }

    const listenContinuously = () => {
        SpeechRecognition.startListening({
            continuous: true,
            language: 'uk-UA',
        });
    };

    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={listenContinuously}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
        </div>
    )
}
export default IndexPage


