const frequency_C0 = 16.35159783128742;

var note_1;
var note_2;

$(document).ready(function () {

  $('#play').click(function () {
    // Choose a random starting note
    note_1 = random_note();
    note_2 = note_1 + random_interval();

    // Play interval
    play_interval();
    key_color_reset();

    // Hide result and show user input
    $('input').val("");
    $('#user-input').show();
    $('#result').hide();
    $('#text').html("");

    // Focus on input
    $('input').focus();
  });

  $('#replay').click(function () {
    play_interval();
    $('input').focus();
  });

  $('#enter').click(function () {
    // Retrieve guessed frequency
    var guess = parse_interval($('input').val());
    if(guess != guess) return;

    key_color(note_1, 'note-1');
    key_color(note_2, 'note-2');

    $('#text').html('<span class="answer">' + interval_to_name(note_2 - note_1) + '</span><span class="guess">' + interval_to_name(guess) + '</span>');

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

  display_intervals();
});

function play_interval() {
  play(note_to_frequency(note_1), 0.5);
  setTimeout(function () { play(note_to_frequency(note_2), 0.5); }, 500);
}

function random_note() {
  // Choose a note between C2 and C5
  return 12 * 4 + Math.floor(Math.random() * 12 * 1);
}

var intervals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
function random_interval() {
  return intervals[Math.floor(Math.random() * intervals.length)];
}

function interval_to_name(interval) {
  if(interval == 0) return 'Perfect unison';
  if(interval == 1) return 'Minor second';
  if(interval == 2) return 'Major second';
  if(interval == 3) return 'Minor third';
  if(interval == 4) return 'Major third';
  if(interval == 5) return 'Perfect fourth';
  if(interval == 6) return 'Tritone';
  if(interval == 7) return 'Perfect fifth';
  if(interval == 8) return 'Minor sixth';
  if(interval == 9) return 'Major sixth';
  if(interval == 10) return 'Minor seventh';
  if(interval == 11) return 'Major seventh';
  if(interval == 12) return 'Perfect octave';
  return '?';
}

function parse_interval(text) {
  var x = parseInt(text);
  if(x == x) return x;

  if(text == 'P1') return 0;
  if(text == 'm2') return 1;
  if(text == 'M2') return 2;
  if(text == 'm3') return 3;
  if(text == 'M3') return 4;
  if(text == 'P4') return 5;
  if(text == 'TT') return 6;
  if(text == 'P5') return 7;
  if(text == 'm6') return 8;
  if(text == 'M6') return 9;
  if(text == 'm7') return 10;
  if(text == 'M7') return 11;
  if(text == 'P8') return 12;

  return NaN;
}

function note_to_name(note) {
  var notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  var letter = notes[note % 12];
  var octave = Math.floor(note / 12);

  return letter + octave;
}

function note_to_frequency(note) {
  return frequency_C0 * Math.pow(2.0, note / 12.0);
}

function name_to_frequency(input) {
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
  return note_to_frequency(octave * 12 + semitones);
}

function display_intervals() {
  for(var i = 0;i < intervals.length;i ++) {
    (function (interval) { $('#intervals').append($('<div>').text(interval_to_name(interval)).click(function () {
      if($(this).hasClass('disabled')) {
        $(this).removeClass('disabled');
        intervals.push(interval);
      }
      else {
        $(this).addClass('disabled');
        intervals.splice(intervals.indexOf(interval), 1);
      }
    })); })(intervals[i]);
  }

  var children = $('#intervals').children();
  children.eq(1).click();
  children.eq(6).click();
  children.eq(8).click();
  children.eq(10).click();
  children.eq(11).click();
}
