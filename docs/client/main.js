const socket = io.connect('http://localhost:8080', {
    'forceNew': true
})

socket.on('messages', (data) => {
    render(data);
});

function render(data) {
    let html = data.map((message, index) => {
        return (`
            <div class="card text-black bg-white m-4">
                <div class="card-body">
                    <h5 class="card-title">${message.nickname}</h5>
                    <p class="card-text">${message.text}</p>
                </div>
            </div>
        `);
    }).join(' ');

    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('textArea').value
    }

    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', message);

    return false;
}