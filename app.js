
//variables and arrays
let sentences = [
    'ten ate neite ate nee enet ite ate inet ent eate',
    'Too ato too nOt enot one totA not anot tOO aNot',
    'oat itain oat tain nate eate tea anne inant nean',
    'itant eate anot eat nato inate eat anot tain eat',
    'nee ene ate ite tent tiet ent ine ene ete ene ate'
];

let sentenceCount = 0;
let $sentences = $('#sentence');
let $yellowBlock = $('#yellow-block');
let $targetLetter = $('#target-letter');

//hide upper case keyboard on load
$('#keyboard-upper-container').hide();


//toggle uppercase keyboard
$(document).keydown(function (e) {
    if (e.keyCode === 16) {
        $('#keyboard-lower-container').hide();
        $('#keyboard-upper-container').show();
    }
});
$(document).keyup(function (e) {
    $('.highlight').removeClass('highlight');
    if (e.keyCode === 16) {

        $('#keyboard-upper-container').hide();
        $('#keyboard-lower-container').show();
    }
})


//highlight keys that are pressed
$(document).keypress(function (e) {
    $('#' + e.keyCode).addClass('highlight');
    $yellowBlock.css('left', "+=20px");
})


//display sentences at top
$('<h2>' + sentences[sentenceCount] + '</h2>').appendTo($sentences)


//display target letter
$('<h3>' + 't' + '</h3>').appendTo($targetLetter);

