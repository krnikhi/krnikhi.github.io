const recorder = document.getElementById('recorder');
const output = document.getElementById('output');

let recognition;

recorder.addEventListener('click', () => {
  if (!recognition) {
    recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      output.innerText = transcript;
    };

    recognition.onend = () => {
      recognition = null;
      recorder.style.backgroundColor = 'red';
    };
  }

  if (recognition && !recognition.start) {
    output.innerText = 'Your browser does not support speech recognition';
    return;
  }

  if (recognition && recognition.start) {
    recognition.start();
    recorder.style.backgroundColor = 'green';
  }
});
