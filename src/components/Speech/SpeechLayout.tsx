'use client'
import React, {useEffect, useState} from 'react';
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import SpeechText from "@/components/Speech/SpeechText";
import {extractVoiceCommand} from "@/helpers/extractVoiceCommand";

export const SpeechLayout = () => {
    const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState<boolean | null>(null);
    const [recording,setRecording ] = useState<null | boolean>(null)


    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();


    const listenContinuously = () => {
        SpeechRecognition.startListening({
            continuous: true,
            language: 'uk-UA',
        });
    };

    useEffect(() => {
        if(browserSupportsSpeechRecognition){
            setSpeechRecognitionSupported(browserSupportsSpeechRecognition);
            listenContinuously()
        }
    }, [browserSupportsSpeechRecognition]);

    useEffect(() =>{
        let transcriptArr = transcript.split(' ')
        let lastTwoWords = `${transcriptArr[transcriptArr.length-2]} ${transcriptArr[transcriptArr.length-1]}`

        let command = extractVoiceCommand(lastTwoWords)

        if(command==='start'){
            console.log('START')
            resetTranscript()
            setRecording(true)
            SpeechRecognition.stopListening

        } else if(command=== 'stop'){
            console.log('STOPP')
            setRecording(false)
            resetTranscript()
        }

    },[transcript])


    if (speechRecognitionSupported === null) {
        return null; // or a loading indicator
    }

    console.log('RQ', recording)


    console.log(transcript)

    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={listenContinuously}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            {/*<SpeechText start={listenContinuously} stop={SpeechRecognition.stopListening} transcript={transcript}/>*/}
            {recording? <p>{transcript}</p>: <p></p>}
        </div>
    );
};

