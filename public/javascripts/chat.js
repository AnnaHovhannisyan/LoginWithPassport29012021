$(function () {

    $('form').submit(function(e){
        e.preventDefault(); // prevents page reloading
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });

});
socket.on('chat message', function(msg){
    console.log('chat');
    $('#messages').append($('<li>').text(msg));
});