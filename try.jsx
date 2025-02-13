import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import * as math from "mathjs";
import Tesseract from "tesseract.js";

export default function PiMemorizationApp() {
  const [piDigits, setPiDigits] = useState("3.1415926535...");
  const [recognizedText, setRecognizedText] = useState("");
  const [speechResult, setSpeechResult] = useState("");

  useEffect(() => {
    generatePi(1000);
  }, []);

  const generatePi = (digits) => {
    let pi = math.pi.toString().slice(0, digits + 2);
    setPiDigits(pi);
  };

  const recitePi = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(piDigits);
    synth.speak(utterance);
  };

  const testRecitation = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();
    recognition.onresult = (event) => {
      setSpeechResult(event.results[0][0].transcript);
    };
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Tesseract.recognize(
        file,
        "eng",
        {
          logger: (m) => console.log(m),
        }
      ).then(({ data: { text } }) => {
        setRecognizedText(text);
      });
    }
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold">Pi Memorization App</h1>
      <p className="text-lg mt-2">{piDigits}</p>
      <Button onClick={recitePi} className="mt-2">Recite Pi</Button>
      <Button onClick={testRecitation} className="mt-2 ml-2">Test Recitation</Button>
      <p className="mt-2">You said: {speechResult}</p>
      <input type="file" onChange={handleImageUpload} className="mt-4" />
      <p className="mt-2">Recognized Handwriting: {recognizedText}</p>
    </div>
  );
}