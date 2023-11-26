'use client'
import React, {useEffect} from 'react';


// @ts-ignore
const SpeechText = ({transcript, start,stop}) => {

    useEffect(()=>{
        console.log('rerender')
    })

    console.log(transcript)


    return (
        <div>
            {transcript}
        </div>
    );
};

export default SpeechText;