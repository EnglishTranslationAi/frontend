'use client'
import "regenerator-runtime"
// @ts-ignore
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {useEffect, useState} from "react";

const IndexPage = () => {
    const [message, setMessage] = useState('');
    // @ts-ignore
    // @ts-ignore
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
        interimTranscript,
        finalTranscript,
        resetTranscript,
        listening,
    } = useSpeechRecognition({ commands });

    useEffect(() => {
        if (finalTranscript !== '') {
            console.log('Got final result:', finalTranscript);
        }
    }, [interimTranscript, finalTranscript]);
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null;
    }

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
    }
    const listenContinuously = () => {
        SpeechRecognition.startListening({
            continuous: true,
            language: 'uk-UA',
        });
    };
    return (
        <div>
            <div>
       <span>
         listening:
           {' '}
           {listening ? 'on' : 'off'}
       </span>
                <div>
                    <button type="button" onClick={resetTranscript}>Reset</button>
                    <button type="button" onClick={listenContinuously}>Listen</button>
                    <button type="button" onClick={SpeechRecognition.stopListening}>Stop</button>
                </div>
            </div>
            <div>
                {message}
            </div>
            <div>
                <span>{transcript}</span>
            </div>
        </div>
    );
};
export default IndexPage