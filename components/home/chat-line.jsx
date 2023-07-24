'use client';
require('dotenv').config();

import React, { useState, useEffect } from 'react';
import { CommandLineIcon, UserIcon } from '@heroicons/react/24/outline';
import Recordicon from '../shared/icons/recordicon';
import LoadIcon from '../shared/icons/loadicon';
import PauseIcon from '../shared/icons/PauseIcon';

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div className="border-b border-black/10 bg-gray-50 text-gray-800">
    <div className="relative m-auto flex p-4 text-base md:max-w-2xl gap-2 md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
      <div className="min-w-[30px]">
        <CommandLineIcon />
      </div>
      <span className="animate-pulse cursor-default mt-1">▍</span>
    </div>
  </div>
);

// util helper to convert new lines to <br /> tags
const convertNewLines = (text) =>
  text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

export function ChatLine({ role = 'assistant', content, isStreaming }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioElement, setAudioElement] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);

  if (!content) {
    return null;
  }

  const contentWithCursor = `${content}${isStreaming ? '▍' : ''}`;
  const formatteMessage = convertNewLines(contentWithCursor);

  const pauseAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      setIsPlaying(false);
    }
  };

  const speakAssistantMessage = (content) => {
    setIsLoading(true); // Set loading to true when the button is clicked

    // Create a SpeechSynthesisUtterance with the provided content
    const assistantUtterance = new SpeechSynthesisUtterance(content);

    // Speak the content using the Speech Synthesis API
    window.speechSynthesis.speak(assistantUtterance);

    // Now, send the text data to the backend using fetch API
    const backendUrl = 'http://localhost:8000'; // Replace with your actual backend API URL
    const url = 'https://backend-project-5m5f.onrender.com';

    fetch(`${backendUrl}/api/audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: content }), // Assuming the backend expects the 'text' property in the request body
    })
      .then((response) => response.json())
      .then((data) => {
        // Do something with the response from the backend if needed
        setIsLoading(false);
        setIsPlaying(true);
        // If the response contains the audio URL, play it in the background
        if (data.msg) {
          if (audioElement && !audioElement.paused) {
            pauseAudio();
          }
          const audio = new Audio(data.msg);
          audio.play().catch((error) => {
            // Handle any error that occurs during audio playback
            console.error('Error playing audio:', error);
          });

          // Now, add an event listener for the "ended" event
          audio.addEventListener('ended', () => {
            setIsPlaying(false); // You can perform any action here
          });
          setAudioElement(audio);
          setCurrentAudio(audio);
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    return () => {
      if (currentAudio && !currentAudio.paused) {
        pauseAudio();
      }
    };
  }, [currentAudio]);


  return (
    <div
      className={
        role === 'assistant'
          ? 'border-b border-black/10 bg-gray-50 text-gray-800'
          : 'border-b border-black/10 bg-white text-gray-800'
      }
    >
      <div className="relative m-auto flex p-4 text-base md:max-w-2xl gap-2 md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
        <div className="min-w-[30px]">
          {role === 'assistant' || role === 'system' ? (
            <CommandLineIcon />
          ) : (
            <UserIcon />
          )}
        </div>

        <div className="prose whitespace-pre-wrap flex-1">
          {formatteMessage}
        </div>
        {role === 'assistant' && (
          <button
            className="ml-2"
            onClick={() => {
              if (isPlaying) {
                pauseAudio();
              } else {
                speakAssistantMessage(content);
              }
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadIcon />
            ) : (
              isPlaying ? <PauseIcon /> : <Recordicon
                classText={
                  isPlaying ? 'animate-pulse text-red-500' : 'text-sky-500'
                }
              />
            )}
          </button>
        )}
      </div>
    </div>
  );
}