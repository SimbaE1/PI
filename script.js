document.addEventListener("DOMContentLoaded", () => {
    generatePi(1000);
    document.getElementById("imageUpload").addEventListener("change", handleImageUpload);
});

function generatePi(digits) {
    document.getElementById("pi-digits").textContent = Math.PI.toString().slice(0, digits + 2);
}

function recitePi() {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(document.getElementById("pi-digits").textContent);
    synth.speak(utterance);
}

function testRecitation() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();
    recognition.onresult = (event) => {
        document.getElementById("speech-result").textContent = event.results[0][0].transcript;
    };
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
