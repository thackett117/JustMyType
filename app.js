
$(document).ready(function () {
    //variables and arrays
    let sentences = [
        'ten ate neite ate nee enet ite ate inet ent eate ', //11 words, 49 characters (including spaces)
        'Too ato too nOt enot one totA not anot tOO aNot ', //11 words, 48 characters
        'oat itain oat tain nate eate tea anne inant nean ', //10 words, 49 characters 
        'itant eate anot eat nato inate eat anot tain eat ', //10 words, 49 characters
        'nee ene ate ite tent tiet ent ine ene ete ene ate' //12 words, 49 characters
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
        $('.highlight').removeClass('highlight'); //un-highlights keys when released
        if (e.which === 16) {
            $('#keyboard-upper-container').hide();
            $('#keyboard-lower-container').show();
        }
    });


    //keypress function for all the things (where the magic happens)
    $(document).keypress(function (e) {
        $('#' + e.which).addClass('highlight'); //highlights keys on press
        if (keyTimer < 1) {
            timeStart = e.timeStamp;  //takes a timestamp when first key is pressed
            keyTimer++;
        }
        if (currentSentence.charCodeAt(letterIndex) === e.which) {   //if the key that is pressed is correct
            $('#feedback').append('<span class="glyphicon glyphicon-ok"></span>');   //add green check mark
            letterIndex++; //increases letter count
            $('#yellow-block').animate({ left: '+=17.3px' }, { duration: 100, easing: 'linear' }); //moves highlight to next letter
            currentLetter = currentSentence[letterIndex]; //updates what the current letter should be
            $('#target-letter').text(currentLetter); //appends new current letter 

            if (letterIndex === currentSentence.length) {  //if you are at the end of the sentence
                letterIndex = 0; //reset letter count
                if (sentenceIndex != 4) { //if you are not on the last sentence
                    sentenceIndex++; //increase sentence count
                    clearBoard();
                    currentSentence = sentences[sentenceIndex]; //update what the new sentence is
                    $('#sentence').append(currentSentence); //append new sentence
                    currentLetter = currentSentence[letterIndex]; //update what the new target letter is
                    $('#target-letter').text(currentLetter); //append new target letter
                    $('#yellow-block').animate({ left: '25px' }, { duration: 100, easing: 'linear' }); //resets highlight to beginning of sentence

                } else if (sentenceIndex < sentences.length) { //if you are at the end of the last sentence
                    timeFinish = e.timeStamp; //take time stamp of last keypress
                    let timeDifference = timeFinish - timeStart; //finds out the total time by taking the difference of the time stamps
                    let seconds = timeDifference / 1000;
                    let minutes = (seconds) / 60;
                    let wordsPerMinute = Math.round(((wordCount / minutes) - 2) * mistakeCount); //math to find words per minute
                    console.log("you had " + wordsPerMinute + " words per minute");
                    clearBoard();
                    $('#feedback').append('<div>' + "Great Job!" + '</div>').css({ //display a great job message
                        "margin-top": "100px",
                        "font-size": "50px"
                    });
                    $('#yellow-block').hide(); //hide the highlight
                    $('.key').hide(); //hide the keyboard
                    $('#sentence').append('Game Over! You got ' + '<span id="wpm">' + wordsPerMinute + '</span>' + ' words per minute!').css('text-align', 'center'); //displays message and results
                    $('#target-letter').append('<button id="reset">Play Again?</button>'); //creates reset button
                    $('#reset').on('click', function () { //reset button reloads the page
                        location.reload();
                    })
                }
            };
        } else { //if the key that is pressed is incorrect
            $('#feedback').append('<span class="glyphicon glyphicon-remove"></span>'); //place a red 'x'
            mistakeCount++; //increase mistake count
        }
    });
})

function clearBoard() {
    $('#sentence').empty();
    $('#target-letter').empty();
    $('#feedback').empty();
};