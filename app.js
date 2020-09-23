$('document').ready(function () {
    
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
    $(document).keypress(function(e) {
        $('#' + e.keyCode).addClass('highlight');
    })

})