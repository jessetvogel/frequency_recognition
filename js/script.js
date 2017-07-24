var frequency;
const frequency_C0 = 16.35159783128742;

$(document).ready(function () {

  $('#play').click(function () {
    // Choose a random frequency
    frequency = random_frequency();

    // Play note and press on piano
    play(frequency, 1.0);
    press("reset", "press");

    // Hide result and show user input
    $('input').val("");
    $('#user-input').show();
    $('#result').hide();
    $('#text').html("");

    // Focus on input
    $('input').focus();
  });

  $('#replay').click(function () {
    play(frequency, 1.0);
    $('input').focus();
  });

  $('#enter').click(function () {
    // Retrieve guessed frequency
    var guess = parseFloat($('input').val());
    if(isNaN(guess))
      guess = to_frequency($('input').val());

    press(note(frequency), 'press');

    if(!isNaN(guess)) {
      press(note(guess), 'guess');
      $('#text').html('<span class="guess-frequency" style="margin-right: 32px;">' + guess.toFixed(2) + ' Hz (' + note(guess) + ')</span>' + difference(frequency, guess) + '<span class="real-frequency" style="margin-left: 32px;">' + frequency.toFixed(2) + ' Hz (' + note(frequency) + ')</span>');
    }
    else {
      $('#text').html('<span class="real-frequency">' + frequency.toFixed(2) + ' Hz (' + note(frequency) + ')</span>');
    }

    // Show result and hide user input
    $('#user-input').hide();
    $('#result').show();
  });

  $(window).keydown(function (e) {
    if(e.which == 13) {
      if($('#user-input').is(":visible"))
        $('#enter').click();
      else
        $('#play').click();
    }
  })
});

function note(frequency) {
  var notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  var semitones = Math.log2(frequency / frequency_C0) * 12.0;

  var note_name = notes[Math.round(semitones) % 12];
  var octave = Math.floor(Math.round(semitones) / 12);

  return note_name + octave;
}

function difference(frequency, guess) {
  var semitones = Math.log2(guess / frequency) * 12.0;
  var cents = Math.round(semitones * 100.0);
  if(Math.abs(cents) < 1 || Math.abs(cents) > 100) return '';

  if(cents > 0)
    return '+' + cents + 'ct';
  if(cents < 0)
    return '-' + (-cents) + 'ct';
}

function random_frequency() {
  var choosable = $('.choosable');
  if(choosable.length == 0) return 1;
  var key = choosable.eq(Math.floor(Math.random() * choosable.length));
  return to_frequency(key.prop('id').replace("sharp", "#"));
}

function to_frequency(input) {
  var semitones = null;
  switch(input.toUpperCase().replace(/\d/, "")) {
    case 'C': semitones = 0; break;
    case 'C#': case 'DB': semitones = 1; break;
    case 'D': semitones = 2; break;
    case 'D#': case 'EB': semitones = 3; break;
    case 'E': semitones = 4; break;
    case 'F': semitones = 5; break;
    case 'F#': case 'GB': semitones = 6; break;
    case 'G': semitones = 7; break;
    case 'G#': case 'AB': semitones = 8; break;
    case 'A': semitones = 9; break;
    case 'A#': case 'BB': semitones = 10; break;
    case 'B': semitones = 11; break;
  }
  if(semitones == null) return NaN;
  var octave = 4; // By default
  var given_octave = parseInt(input.replace(/\D+/, ""));
  if(given_octave == given_octave) octave = given_octave;
  return frequency_C0 * Math.pow(2.0, octave + semitones / 12.0);
}
