import keypressSound from './asset/keypress.mp3';



export const playSound = () => {
    const audio = new Audio(keypressSound); // Replace with the path to your sound file
    audio.play();
};

export const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
};