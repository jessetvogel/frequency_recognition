$(document).ready(function () {

  $('#preset-1').click(function () {
    set_choosable([
      'C3', 'E3', 'G3', 'C4', 'E4', 'G4', 'C5', 'E5', 'G5', 'C6'
    ]);
  });

  $('#preset-2').click(function () {
    set_choosable([
      'C3', 'D3', 'E3', 'G3', 'A3', 'C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5', 'G5', 'A5', 'C6'
    ]);
  });

  $('#preset-3').click(function () {
    set_choosable([
      'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6'
    ]);
  });

  // $('#preset-4').click(function () {
  //   set_choosable([
  //     'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'
  //   ]);
  // });
  //
  // $('#preset-5').click(function () {
  //   set_choosable([
  //     'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'
  //   ]);
  // });

  $('#preset-1').click();

});
