'use client';

import { useState, useRef } from 'react';
import { Box, Button, CircularProgress, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import StopIcon from '@mui/icons-material/Stop';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface TextToSpeechProps {
  text: string;
}

export default function TextToSpeech({ text }: TextToSpeechProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSpeak = async () => {
    try {
      setIsLoading(true);
      const response = await openai.audio.speech.create({
        model: "gpt-4o-mini-tts",
        voice: "coral",
        input: text,
        instructions: "Speak in a cheerful and positive tone.",
        response_format: "wav",
      });

      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audio = new Audio(url);
      audioRef.current = audio;
      
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(url);
        audioRef.current = null;
      };
      audio.onerror = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(url);
        audioRef.current = null;
      };

      await audio.play();
    } catch (error) {
      console.error('Error generating speech:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Button
        onClick={handleSpeak}
        disabled={isLoading || isPlaying}
        startIcon={isLoading ? <CircularProgress size={20} /> : <VolumeUpIcon />}
        variant="contained"
        sx={{
          bgcolor: '#a100e6',
          color: 'white',
          '&:hover': { bgcolor: '#8f00cc' },
          '&:disabled': { bgcolor: '#d4a6e9' }
        }}
      >
        ฟังคำทำนาย
      </Button>
      
      {isPlaying && (
        <IconButton
          onClick={handleStop}
          sx={{
            bgcolor: '#ff4444',
            color: 'white',
            '&:hover': { bgcolor: '#cc0000' }
          }}
        >
          <StopIcon />
        </IconButton>
      )}
    </Box>
  );
} 