//Text-to-speech implementation
const SP = document.getElementById("SP").textContent;
const synth = window.speechSynthesis;
const voice = synth.getVoices().find(v => v.lang === "nl-NL");

function speakText() {
const utterance = new SpeechSynthesisUtterance(SP);
const utterance1 = new SpeechSynthesisUtterance(document.getElementById('PLAN').innerHTML);
utterance.voice = voice;
synth.speak(utterance);
synth.speak(utterance1);
console.log(utterance1)
}


