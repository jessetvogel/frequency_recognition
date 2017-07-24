$(document).ready(function () {

  var piano = $('#piano');

  var width_white = 18.69230769230769;
  var width_black = 12;
  var margin = 1;

  var x = 0;
  var previous_key_type = null;
  var current_key_type = null;

  for(var i = 9;i < 9 + 88;i ++) {
    var id = note(frequency_C0 * Math.pow(2, i / 12.0));
    var key = $('<div>').prop('id', id.replace('#', 'sharp')).addClass('key');

    if(id.indexOf('#') !== -1) {
      key.addClass('black');
      key.css({ width: width_black + 'px' });
      current_key_type = 'black';
    }
    else {
      key.addClass('white');
      key.css({ width: width_white + 'px' });
      current_key_type = 'white';
    }

    if(previous_key_type != null) {
      if(previous_key_type == 'white' && current_key_type == 'white') x += width_white + margin;
      if(previous_key_type == 'white' && current_key_type == 'black') x += width_white + margin / 2 - width_black / 2;
      if(previous_key_type == 'black' && current_key_type == 'white') x += width_black / 2 + margin / 2;
    }

    key.click(function (event) {
      $(this).toggleClass('choosable');
      if(event.metaKey) {
        var choosable = $(this).hasClass('choosable');
        var note = $(this).prop('id').replace(/\d+/, "");
        for(var octave = 0;octave < 9;octave ++) {
          if(choosable)
            $('#' + note.replace('#', 'sharp') + octave).addClass('choosable');
          else
            $('#' + note.replace('#', 'sharp') + octave).removeClass('choosable');
        }
      }
    });

    key.css({ left: x + 'px' });
    piano.append(key);
    previous_key_type = current_key_type;
  }
  
});

function press(note, c) {
  if(c == 'press') reset();
  $('#' + note.replace('#', 'sharp')).addClass(c);
}

function reset() {
  $('.key').removeClass('press').removeClass('guess');
}

function set_choosable(notes) {
  $('.key').removeClass('choosable');
  for(var i = 0;i < notes.length; i++)
    $('#' + notes[i]).addClass('choosable');
}
