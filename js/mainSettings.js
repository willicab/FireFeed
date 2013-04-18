$(document).ready(function () {
    if (general['hideReaded'] == false) {
        $('#Check').css('background-image', 'url("img/uncheck.png")');
    } else {
        $('#Check').css('background-image', 'url("img/check.png")');
    }
    
    $('#hideReaded').click(function(){
        if (general['hideReaded'] == true) {
            $('#Check').css('background-image', 'url("img/uncheck.png")');
            general['hideReaded'] = false;
        } else {
            $('#Check').css('background-image', 'url("img/check.png")');
            general['hideReaded'] = true;
        }
        saveAll();
    });
});
