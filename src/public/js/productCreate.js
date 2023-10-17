// script.js

import {ToasteMessag} from "./messageFlash.js";

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
        if (response.ok) {
            // Procesar la respuesta si es necesario
            console.log('Solicitud enviada con éxito');
            ToasteMessag("Se creo el producto!")
            setTimeout(function() {
                location.reload();
            }, 3000);
        } else {
            console.error('Error al enviar la solicitud');
            ToasteMessag("No fue posible crear un nuevo producto")
        }
    }).catch(error => {
        console.error('Error al enviar la solicitud CURL', error);
    });
});