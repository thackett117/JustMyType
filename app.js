
$(document).ready(function () {
    //variables and arrays
    let sentences = [
        'ten ate neite ate nee enet ite ate inet ent eate',
        'Too ato too nOt enot one totA not anot tOO aNot',
        'oat itain oat tain nate eate tea anne inant nean',
        'itant eate anot eat nato inate eat anot tain eat',
        'nee ene ate ite tent tiet ent ine ene ete ene ate'
    ];

    let sentenceIndex = 0;
    let letterIndex = 0;
    let currentSentence = sentences[sentenceIndex];
    let currentLetter = currentSentence[letterIndex];
    $('#target-letter').text(currentLetter);
    $('#sentence').append(currentSentence);
    let mistakeCount = 0;

    //hide upper case keyboard on load
    $('#keyboard-upper-container').hide();


    //toggle uppercase keyboard
    $(document).keydown(function (e) {
        if (e.which === 16) {
            $('#keyboard-lower-container').hide();
            $('#keyboard-upper-container').show();
        }
    });
    $(document).keyup(function (e) {
        $('.highlight').removeClass('highlight');
        if (e.which === 16) {
            $('#keyboard-upper-container').hide();
            $('#keyboard-lower-container').show();
        }
    });



    //keypress function for all the things (where the magic happens)
    $(document).keypress(function (e) {
        $('#' + e.which).addClass('highlight');
        if (currentSentence.charCodeAt(letterIndex) === e.which) {
            $('#feedback').append('<span class="glyphicon glyphicon-ok"></span>');
            letterIndex++;
            $('#yellow-block').css('left', '+=18px');
            currentLetter = currentSentence[letterIndex];
            $('#target-letter').text(currentLetter);

            if(letterIndex === currentSentence.length) {
                letterIndex = 0;
                if (sentenceIndex != 4) {
                    sentenceIndex++;
                    $('#feedback').empty();
                    $('#sentence').empty();
                    currentSentence = sentences[sentenceIndex];
                    $('#sentence').append(currentSentence);
                    $('target-letter').empty();
                    currentLetter = currentSentence[letterIndex];
                    $('#target-letter').text(currentLetter);
                    $('#yellow-block').css('left', '18px');

                    if (letterIndex === currentSentence.length) {
                        alert('game over');
                    }
                } else if (sentenceIndex < sentences.length) {
                    alert("You made " + mistakeCount + " typos");
                }
                
               
            };
        } else {
            $('#feedback').append('<span class="glyphicon glyphicon-remove"></span>');
            mistakeCount++;
            


        }


    
    });

})

