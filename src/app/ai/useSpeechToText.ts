import { useState, useRef, useEffect } from "react";

type SpeechRecognition = any;

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognition;
    webkitSpeechRecognition: SpeechRecognition;
  }
}

function getSpeechRecognition() {
  return (
    typeof window !== "undefined" &&
    (window.SpeechRecognition || window.webkitSpeechRecognition)
  );
}

export function useSpeechToText() {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | undefined>();

  useEffect(() => setIsSupported(!!getSpeechRecognition()), []);

  const start = () => {
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) return;

    setTranscript("");
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = stop;

    recognition.onresult = (event: any) => {
      const results = Array.from(event.results) as any[];
      const text = results.map((r: any) => r[0].transcript).join("");
      setTranscript(text);
    };

    recognition.onerror = (err: any) => {
      console.error("Speech recognition error", err);
      stop();
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stop = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  return { transcript, isSupported, isListening, start, stop };
}
