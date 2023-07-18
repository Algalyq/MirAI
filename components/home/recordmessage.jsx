import React, { useState } from 'react';
import { ReactMic } from 'react-mic';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handleAudioData = (recordedBlob) => {
    const audioBlob = new Blob([recordedBlob.blob], { type: 'audio/wav' });
    const url = URL.createObjectURL(audioBlob);
    setAudioUrl(url);

   console.log("audio", audioBlob)
    // Create a FormData object and append the audio blob to it
    const formData = new FormData();
    formData.append('audio', audioBlob);
   
    // Send the audio data to the backend
    fetch('/api/audio', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log('Audio uploaded successfully');
        } else {
          console.error('Error uploading audio:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error uploading audio:', error);
      });
  };


  return (
    <div>
      <ReactMic
        record={isRecording}
        className="sound-wave"
        onStop={handleAudioData}
        mimeType="audio/wav"
      />

      {isRecording ? (
        <button onClick={handleStopRecording}>Stop Recording</button>
      ) : (
        <button onClick={handleStartRecording}>Start Recording</button>
      )}

      {audioUrl && <audio src={audioUrl} controls />}
    </div>
  );
};

export default AudioRecorder;




// import React, { useState } from 'react';
// import { ReactMic } from 'react-mic';

// const AudioRecorder = () => {
//   const [isRecording, setIsRecording] = useState(false);

//   const handleStartRecording = () => {
//     setIsRecording(true);
//   };

//   const handleStopRecording = () => {
//     setIsRecording(false);
//   };

//   const handleAudioData = (recordedBlob) => {
//     // Convert the recorded audio to WAV format
    

//   return (
//     <div>
//       <ReactMic
//         record={isRecording}
//         className="sound-wave"
//         onStop={handleAudioData}
//         mimeType="audio/wav" // Set mimeType to "audio/wav"
//       />

//       {isRecording ? (
//         <button onClick={handleStopRecording}>Stop Recording</button>
//       ) : (
//         <button onClick={handleStartRecording}>Start Recording</button>
//       )}
//     </div>
//   );
// };

// export default AudioRecorder;

//   return (
//     <ReactMediaRecorder
//       audio
//       onStop={(blobUrl: string, blob: Blob) => {
//         sendAudioToBackend(blob);
//         handleStop(); // Call your function to handle recording stop
//       }}
//       render={({ status, startRecording, stopRecording }) => (
//         <div className="bg-white absolute right-2 top-2 rounded-sm p-1 text-neutral-800 opacity-60 hover:bg-neutral-200 hover:text-neutral-900 transition-colors">
          // <button
          //   onMouseDown={startRecording}
          //   onMouseUp={stopRecording}
          //   onTouchStart={startRecording}
          //   onTouchEnd={stopRecording}
          //   className="bg-white rounded-full"
          // >
          //   <Recordicon
          //     classText={
          //       status === "recording"
          //         ? "animate-pulse text-red-500"
          //         : "text-sky-500"
          //     }
          //   />
          // </button>
//         </div>
//       )}
//     />
//   );
// };

















// 'use client'
// import { useRef } from 'react';

// const RecordAudio = () => {
//   const audioChunksRef = useRef<Blob[]>([]);
//   let mediaRecorder: MediaRecorder | null = null;

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorder = new MediaRecorder(stream);

//       mediaRecorder.addEventListener('dataavailable', (event: BlobEvent) => {
//         const audioBlob = event.data;
//         if (audioBlob.size > 0) {
//           audioChunksRef.current.push(audioBlob);
//         }
//       });

//       mediaRecorder.start();
//     } catch (error) {
//       console.error('Error starting audio recording:', error);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder && mediaRecorder.state === 'recording') {
//       mediaRecorder.stop();
//       sendAudioToBackend();
//     }
//   };

//   const sendAudioToBackend = async () => {
//     if (audioChunksRef.current.length === 0) {
//       console.log('No audio data available');
//       return;
//     }
  
//     const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
  
//     const formData = new FormData();
//     formData.append('audio', audioBlob, 'myAudio.wav');
  
//     try {
//       const response = await fetch('http://localhost:8000/api/audio', {
//         method: 'POST',
//         body: formData,
//       });
  
//       if (response.ok) {
//         console.log('Audio uploaded successfully');
//       } else {
//         console.error('Error uploading audio:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error uploading audio:', error);
//     }
  
//     audioChunksRef.current = [];
//   };
  

//   return (
//     <div>
//       <button onClick={startRecording}>Start Recording</button>
//       <button onClick={stopRecording}>Stop Recording</button>
//     </div>
//   );
// };

// export default RecordAudio;
