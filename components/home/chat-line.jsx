'use client';
require('dotenv').config();

import React, { useState,useRef, useEffect } from 'react';
import { CommandLineIcon, UserIcon } from '@heroicons/react/24/outline';
import Recordicon from '../shared/icons/recordicon';
import LoadIcon from '../shared/icons/loadicon';
import PauseIcon from '../shared/icons/PauseIcon';
import axios from 'axios'
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
  const [isButtonActive, setIsButtonActive] = useState(true);
  const contentWithCursor = `${content}${isStreaming ? '▍' : ''}`;
  const formatteMessage = convertNewLines(contentWithCursor);
  const [audioElement, setAudioElement] = useState(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
    
  if (!content) {
    return null;
  }
  
  const handleAudioButtonClick = async (content) => {
    try {
      setIsLoading(true); // Set isLoading to true when sending the message
      const handleAudioEnded = () => {
        setIsPlaying(false);
      };
  
      const payload = {
        text: String(content)
      };
      const backendUrl = 'http://localhost:8000'; // Replace with your actual backend API URL
      const url = 'https://backend-project-5m5f.onrender.com';
  
      const response = await axios.post(`${backendUrl}/api/audio`,payload);
      setIsLoading(true)
      if (!response.data) {
        console.error('Empty response received from the server');
        return;
      }

      const newAudio = new Audio(response.data["msg"]);
      setIsLoading(false)

     



      if (audioRef.current && audioRef.current.src!== newAudio.src) {
  
        audioRef.current.pause();
        setIsPlaying(false)
        audioRef.current.currentTime = 0;
      }
      if (audioRef.current && audioRef.current.src === newAudio.src) {
        if (audioRef.current.paused) {
          audioRef.current.play();
          setIsPlaying(true)
        } else {
          setIsPlaying(false)
          audioRef.current.pause();
        }
      } else {
        newAudio.addEventListener('ended', handleAudioEnded);
        newAudio.play();
        setIsPlaying(true)
        console.log('Started playing new audio.');
        setAudioElement(newAudio);
        audioRef.current = newAudio;
        
      }
      
        
    } catch (error) {
      console.error('Error while fetching or playing audio:', error);
    }
    finally{
      setIsLoading(false); 
    }
  };
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
            onClick={() => handleAudioButtonClick(content)}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadIcon />
            ) : (
              isPlaying ?  
              <PauseIcon />:
              <Recordicon
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