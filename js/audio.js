var context;

$(document).ready(function () {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
});

function play(frequency, seconds) {
  // Create needed components
  var oscillator = context.createOscillator();
  var gain = context.createGain();

  // Set relevant values
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  gain.gain.value = 0.33;

  // Connect
  oscillator.connect(gain);
  gain.connect(context.destination);

  // Start
  oscillator.start();
  oscillator.stop(context.currentTime + seconds);
}
