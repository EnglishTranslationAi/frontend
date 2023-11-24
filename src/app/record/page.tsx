// "use client"
// import React, { useState, useEffect } from "react";
// import styles from '../page.module.css';
//
// // Define types for any complex structures if needed
// // For example, if your API returns a specific object shape, you can define it here
//
// interface SpeechToTextResponse {
//     result: string;
//     error?: string;
// }
//
// export default function Home() {
//     const [result, setResult] = useState<string | undefined>();
//     const [recording, setRecording] = useState<boolean>(false);
//     const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
//
//     let chunks: BlobPart[] = [];
//
//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             navigator.mediaDevices.getUserMedia({ audio: true })
//                 .then(stream => {
//                     const newMediaRecorder = new MediaRecorder(stream);
//                     newMediaRecorder.onstart = () => {
//                         chunks = [];
//                     };
//                     newMediaRecorder.ondataavailable = e => {
//                         chunks.push(e.data);
//                     };
//                     newMediaRecorder.onstop = async () => {
//                         const audioBlob = new Blob(chunks, { type: 'audio/webm' });
//                         const audioUrl = URL.createObjectURL(audioBlob);
//                         const audio = new Audio(audioUrl);
//                         audio.onerror = function (event: Event | string) {
//                             console.error('Error playing audio:', event);
//                         };
//                         audio.play();
//                         try {
//                             const reader = new FileReader();
//                             reader.readAsDataURL(audioBlob);
//                             reader.onloadend = async function () {
//                                 const base64Audio = reader.result as string;
//                                 const response = await fetch("/api/speechToText", {
//                                     method: "POST",
//                                     headers: {
//                                         'Content-Type': 'application/json'
//                                     },
//                                     body: JSON.stringify({ audio: base64Audio.split(',')[1] }),
//                                 });
//                                 const data: SpeechToTextResponse = await response.json();
//                                 if (response.status !== 200) {
//                                     throw new Error(data.error || `Request failed with status ${response.status}`);
//                                 }
//                                 setResult(data.result);
//                             }
//                         } catch (error: any) {
//                             console.error(error);
//                             alert(error.message);
//                         }
//                     };
//                     setMediaRecorder(newMediaRecorder);
//                 })
//                 .catch(err => console.error('Error accessing microphone:', err));
//         }
//     }, []);
//
//     const startRecording = () => {
//         mediaRecorder?.start();
//         setRecording(true);
//     };
//
//     const stopRecording = () => {
//         mediaRecorder?.stop();
//         setRecording(false);
//     };
//
//     return (
//         <main className={styles.main}>
//             <div className={styles.description}>
//                 <h2>
//                     Convert audio to text <span>-&gt;</span>
//                 </h2>
//                 <button onClick={recording ? stopRecording : startRecording}>
//                     {recording ? 'Stop Recording' : 'Start Recording'}
//                 </button>
//                 <p>{result}</p>
//             </div>
//         </main>
//     );
// }
