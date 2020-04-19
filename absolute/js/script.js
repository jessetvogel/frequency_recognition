var current_note;
var current_frequency;

function choose_new_note() {
	$('.correct').removeClass('correct');
	$('.incorrect').removeClass('incorrect');

	current_note = Math.floor(Math.random() * how_many_notes);
	current_frequency = frequency_0 * Math.pow(2.0, current_note / 12.0);
}

function play_current_note() {
	play(current_frequency, 1);
}

function guess(n) {
	if(n == current_note) {
		highlight_note(n, true);

		setTimeout(function () {
			choose_new_note();
			play_current_note();	
		}, 200);
	}
	else {
		highlight_note(n, false);
	}
}

function highlight_note(n, correct) {
	let key = $($('#piano').children().get(n));
	if(key.hasClass('white'))
		key.addClass(correct ? 'correct' : 'incorrect');

	if(key.hasClass('black'))
		key.children().first().addClass(correct ? 'correct' : 'incorrect');
}

$(document).ready(function () {
	choose_new_note();
	$('#piano .white').click(function () {
		guess($(this).index());
	})

	$('#piano .black div').click(function () {
		guess($(this).parent().index());
	})
});
