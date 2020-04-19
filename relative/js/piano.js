$(document).ready(function () {

  var piano = $('#piano');

  var width_white = 18.69230769230769;
  var width_black = 12;
  var margin = 1;

  var x = 0;
  var previous_key_type = null;
  var current_key_type = null;

  for(var i = 9;i < 9 + 88;i ++) {
    var id = note_to_id(i);
    var key = $('<div>').prop('id', id).addClass('key');

    if(id.indexOf('sharp') !== -1) {
      key.addClass('black');
      key.css({ width: width_black + 'px' });
      current_key_type = 'black';
    }
    else {
      key.addClass('white');
      key.css({ width: width_white + 'px' });
      // key.text(id);
      current_key_type = 'white';
    }

    if(previous_key_type != null) {
      if(previous_key_type == 'white' && current_key_type == 'white') x += width_white + margin;
      if(previous_key_type == 'white' && current_key_type == 'black') x += width_white + margin / 2 - width_black / 2;
      if(previous_key_type == 'black' && current_key_type == 'white') x += width_black / 2 + margin / 2;
    }

    key.css({ left: x + 'px' });
    piano.append(key);
    previous_key_type = current_key_type;
  }

});

function note_to_id(note) {
  return note_to_name(note).replace('#', 'sharp');
}

function key_color(note, c) {
  $('#' + note_to_id(note)).addClass(c);
}

function key_color_reset() {
  $('.key').removeClass('note-1').removeClass('note-2');
}
