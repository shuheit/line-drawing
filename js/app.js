var app = app || {};

$(function() {
	initCanvas();

	$('#clear').click(function(){
		clearCanvas();
	});

	$( 'input[name="radio"]:radio' ).change( function() {  
		clearCanvas();
	});
});