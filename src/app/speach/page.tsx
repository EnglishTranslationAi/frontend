'use client'
import React, { useEffect, useState} from "react";

import "regenerator-runtime";

import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";


const Speech: React.FC = () => {
    const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState<boolean | null>(null);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    useEffect(() => {
        setSpeechRecognitionSupported(browserSupportsSpeechRecognition);
    }, [browserSupportsSpeechRecognition]);

    if (speechRecognitionSupported === null) {
        return null; // or a loading indicator
    }

    if (!speechRecognitionSupported) {
        return <span>Browser does not support speech recognition.</span>;
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
    );
};

export default Speech;
