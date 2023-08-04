


const socket = io();
socket.on('message', data => {
    console.log(data)
})

socket.on('changeInPorducts', data => {
    console.log("Hay cambios del tipo: ", data)
    socket.emit('getUpdateProducts', "refresh data")
})

socket.on('productsUpdated', data => {
    console.log("update HTML")
    const body  = document.getElementsByTagName('body')[0];
    body.innerHTML = ''
    body.innerHTML = data[1]
})

