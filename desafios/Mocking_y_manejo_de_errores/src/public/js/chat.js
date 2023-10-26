const socket = io();
const chatBox = document.getElementById('chatBox')
const user = document.getElementById('user_name').innerText;

socket.emit('userConnected', { user: user })
chatBox.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', { user: user, message: chatBox.value })
            chatBox.value = '';
        }
    }
})
socket.on('messageLogs', data => {
    const messageLog = document.getElementById('messageLogs')
    let logs = '';
    data.forEach(log => {
        logs += `${log.user} dice: ${log.message}<br/>`
    });
    // Aqui cargamos el renderizado de los mensajes
    messageLog.innerHTML = logs;
})
socket.on('userConnected', data => {
    console.log(data);
    let message = `Nuevo usuario conectado: ${data}`
    Swal.fire({
        icon: "info",
        title: 'Nuevo usuario entra al chat!!',
        text: message,
        toast: true,
    })
})

// close chatBox
const closeChatBox = document.getElementById('closeChatBox')
closeChatBox.addEventListener('click', evt => {
    socket.emit('closeChat', { close: "close" })
    messageLog.innerHTML = '';
})