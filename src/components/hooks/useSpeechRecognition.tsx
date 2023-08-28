/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
const client = window as any;
const speechRecognition = client.SpeechRecognition || client.webkitSpeechRecognition;
const recognition = new speechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

const useSpeechRecognition = () => {
  const [listening, setListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [interim, setInterim] = useState<string>('');

  useEffect(() => {
    if (listening) {
      recognition.start();
    } else {
      recognition.stop();
      setInterim('');
      setTranscript('');
    }
  }, [listening]);

  useEffect(() => {
    recognition.onresult = (event: any) => {
      const last = event.results.length - 1;
      const text = event.results[last][0].transcript;

      if (event.results[last].isFinal) {
        setTranscript(text);
        setListening(false);
      } else {
        const interimText = event.results[last][0].transcript;
        setInterim(interimText)
      }
    };
  }, []);

  const toggleListening = () => {
    setListening((prev) => !prev);
  };

  return { listening, toggleListening, transcript, interim };
};

export default useSpeechRecognition;
