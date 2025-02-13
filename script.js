const PI_250_DIGITS =
    "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019";

// Load first 250 digits of Pi
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("pi-digits").textContent = PI_250_DIGITS;
    document.getElementById("imageUpload").addEventListener("change", handleImageUpload);
});

// Recite Pi using speech synthesis
function recitePi() {
    speakText(PI_250_DIGITS);
}

// Test recitation using Speech-to-Text
function testRecitation() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();
    recognition.onresult = (event) => {
        document.getElementById("speech-result").textContent = event.results[0][0].transcript;
    };
}

// Speak text using SpeechSynthesis API
function speakText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Your browser doesn't support speech synthesis.");
    }
}

// Handle handwriting recognition
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        Tesseract.recognize(
            file,
            "eng",
            { logger: (m) => console.log(m) }
        ).then(({ data: { text } }) => {
            processRecognizedText(text);
        });
    }
}

// Process and compare recognized text with Pi
function processRecognizedText(text) {
    const cleanText = text.replace(/[^0-9]/g, "").slice(0, 250); // Remove non-digits & limit to 250 digits
    const accuracy = calculateAccuracy(cleanText, PI_250_DIGITS);
    
    document.getElementById("recognized-text").textContent = cleanText || "No digits recognized";
    document.getElementById("recognized-length").textContent = cleanText.length;
    document.getElementById("accuracy").textContent = accuracy.toFixed(2);
}

// Calculate accuracy of handwriting recognition
function calculateAccuracy(recognized, actual) {
    let correct = 0;
    for (let i = 0; i < recognized.length; i++) {
        if (recognized[i] === actual[i]) correct++;
    }
    return (correct / actual.length) * 100;
}
