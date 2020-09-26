
$(document).ready(function () {
    //variables and arrays
    let sentences = [
        'ten ate neite ate nee enet ite ate inet ent eate ', //11 words, 49 characters (including spaces)
        'Too ato too nOt enot one totA not anot tOO aNot ', //11 words, 48 characters
        'oat itain oat tain nate eate tea anne inant nean ', //10 words, 49 characters 
        'itant eate anot eat nato inate eat anot tain eat ', //10 words, 49 characters
        'nee ene ate ite tent tiet ent ine ene ete ene ate' //12 words, 59 characters
    ]; //54 words total

    let sentenceIndex = 0;
    let letterIndex = 0;
    let currentSentence = sentences[sentenceIndex];
    let currentLetter = currentSentence[letterIndex];
    $('#target-letter').text(currentLetter);
    $('#sentence').append(currentSentence);
    let mistakeCount = 0;
    let wordCount = 54;
    let keyTimer = 0;
    let timeStart = 0;
    let timeFinish = 0;

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
        if (keyTimer < 1) {
            timeStart = e.timeStamp;
            keyTimer++;
        }

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

                } else if (sentenceIndex < sentences.length) {
                    timeFinish = e.timeStamp;
                    let timeDifference = timeFinish - timeStart;
                    let seconds = timeDifference / 1000;
                    let minutes = (seconds) / 60;
                    let wordsPerMinute = Math.round(((wordCount / minutes) - 2) * mistakeCount);
                    console.log("you had " + wordsPerMinute + " words per minute");
                    $('#feedback').empty();
                    $('#sentence').empty();
                    $('#yellow-block').hide();
                    $('#target-letter').empty();
                    $('#sentence').append("Game Over! You got " + wordsPerMinute + " words per minute!").css('text-align', 'center');
                }
                
               
            };
        } else {
            $('#feedback').append('<span class="glyphicon glyphicon-remove"></span>');
            mistakeCount++;
            


        }


    
    });

})

