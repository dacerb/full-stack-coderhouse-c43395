const mensajeCreate = document.getElementById("message-create");

function openModal() {
    var modal = document.getElementById("modal-create-product");
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("modal-create-product");
    modal.style.display = "none";
}


function addAttachment() {
    var input = document.createElement('input');
    input.type = 'file';
    input.name = 'thumbnails';
    input.accept = 'image/*';
    document.getElementById('attachmentContainer').appendChild(input);
}

function removeAttachment() {
    var attachments = document.getElementsByName('thumbnails');
    if (attachments.length > 1) {
        var lastAttachment = attachments[attachments.length - 1];
        lastAttachment.parentNode.removeChild(lastAttachment);
    }
}

document.getElementById('curlForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let formData = new FormData(this);


    if (formData.get('status') === 'on') {
        formData.set('status', 'true');
    }

    fetch('http://localhost:8080/api/products/', {
        method: 'POST',
        headers: {
        },
        body: formData
    }).then(response => {
        console.log(response)
        if (response.ok) {
            mensajeCreate.textContent = "Solicitud enviada con éxito";
            location.reload();
        } else {
            console.error('Error al enviar la solicitud');
            mensajeCreate.textContent = "No fue posible crear un nuevo producto, status code:  "+ response.status;
        }
    }).catch(error => {
        console.error('Error al enviar la solicitud CURL', error);
    });
});