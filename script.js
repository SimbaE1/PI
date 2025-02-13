document.addEventListener("DOMContentLoaded", () => {
    generatePi(1000);
    document.getElementById("imageUpload").addEventListener("change", handleImageUpload);
});

function generatePi(digits) {
    document.getElementById("pi-digits").textContent = Math.PI.toString().slice(0, digits + 2);
}

function recitePi() {
    const text = document.getElementById("pi-digits").textContent;
    speakText(text);
}

function testRecitation() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();
    recognition.onresult = (event) => {
        document.getElementById("speech-result").textContent = event.results[0][0].transcript;
    };
}

function speakText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Your browser doesn't support speech synthesis.");
    }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        Tesseract.recognize(
            file,
            "eng",
            { logger: (m) => console.log(m) }
        ).then(({ data: { text } }) => {
            document.getElementById("recognized-text").textContent = text;
        });
    }
}
