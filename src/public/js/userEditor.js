const editButtons = document.querySelectorAll('.editUser');
const cancelButtons = document.querySelectorAll('.cancelEdit');
const deleteButtons = document.querySelectorAll('.deleteUser');
const saveButtons = document.querySelectorAll('.saveUser');


editButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault()
        const userId = event.currentTarget.getAttribute('data-user-id');
        document.getElementById(`userEditForm-${userId}`).style.display = 'block';
    });
});

cancelButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault()
        const userId = event.currentTarget.getAttribute('data-user-id');
        document.getElementById(`userEditForm-${userId}`).style.display = 'none';
    });
});


deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault()
        const userId = event.currentTarget.getAttribute('data-user-id');
        console.log('deleteButtons USER ID: ', userId)

        try {
            fetch(`/api/users/${userId}`, {
                method: 'DELETE',
                headers: {}
            }).then(response => {
                console.log(response)
                if (response.ok) {
                    location.reload();
                } else {
                    console.error('Error al eliminar el usuario.');
                }
            }). catch (error => {
                console.error('Error en la solicitud', error);
            });

        } catch (error) {
            console.error('Error con interno', error);
        }

    });
});


saveButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault()
        const userId = event.currentTarget.getAttribute('data-user-id');
        console.log('saveButtons USER ID: ', userId)

        const form = document.getElementById(`userEditForm-${productId}`);

        // Recopila los datos del formulario
        const formData = new FormData(form);

        try {
            const response =  fetch(`/api/users/${userId}`, {
                method: 'UPDATE',
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