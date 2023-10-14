
const editButtons = document.querySelectorAll('.editProduct');
const saveButtons = document.querySelectorAll('.saveProduct');
const cancelButtons = document.querySelectorAll('.cancelEdit');

editButtons.forEach(button => {
button.addEventListener('click', (event) => {
    const productId = event.currentTarget.getAttribute('data-product-id');
    document.getElementById(`productEditForm-${productId}`).style.display = 'block';
});
});

saveButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
        event.preventDefault();
        const productId = event.currentTarget.getAttribute('data-product-id');
        const form = document.getElementById(`productEditForm-${productId}`);

        // Recopila los datos del formulario
        const formData = new FormData(form);

        try {
            const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
                method: 'PUT',
                body: formData,
                headers: {}
            });
            if (response.ok) {
                location.reload();
            } else {
                console.error('Error al guardar los cambios.');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    });
});


cancelButtons.forEach(button => {
button.addEventListener('click', (event) => {
    const productId = event.currentTarget.getAttribute('data-product-id');
    document.getElementById(`productEditForm-${productId}`).style.display = 'none';
});
});

document.querySelectorAll('.add-thumbnail').forEach(button => {
    button.addEventListener('click', (event) => {
        const id_target = event.target.id
        const thumbnailInputContainer = document.getElementById(`productEditForm-thumbnail-${id_target}`);

        // Crear un nuevo elemento de entrada de archivo
        const thumbnailContainer = document.createElement('div');
        thumbnailContainer.classList.add('file-input-container');


        const newThumbnailInput = document.createElement('input');
        newThumbnailInput.setAttribute('type', 'file');
        newThumbnailInput.setAttribute('name', 'thumbnails');
        newThumbnailInput.classList.add('file-input');
        newThumbnailInput.id = `thumbnails-${id_target}-${Date.now()}`; // Agregar una marca de tiempo para evitar conflictos

        // Crear un botón para eliminar el elemento
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Eliminar';
        removeButton.addEventListener('click', () => {
            thumbnailContainer.removeChild(newThumbnailInput);
            thumbnailContainer.removeChild(removeButton);
        });

        // Agregar el nuevo elemento y el botón al contenedor


        thumbnailContainer.appendChild(newThumbnailInput)
        thumbnailContainer.appendChild(removeButton)

        thumbnailInputContainer.appendChild(thumbnailContainer)
    });
});
