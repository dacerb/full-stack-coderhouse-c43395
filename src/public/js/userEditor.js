const editButtons = document.querySelectorAll('.editUser');
const cancelButtons = document.querySelectorAll('.cancelEdit');
const deleteButtons = document.querySelectorAll('.deleteUser');
const saveButtons = document.querySelectorAll('.saveUser');
const buttonJobDeleteUsers = document.getElementById('runJobDeletUsers');


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
            }).catch (error => {
                console.error('problemas con el backend.', error);
            });

        } catch (error) {
            console.error('problema con el envio de la solicitud', error);
        }

    });
});

saveButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
        event.preventDefault()
        const userId = event.currentTarget.getAttribute('data-user-id');
        const form = document.getElementById(`userEditForm_data-${userId}`);
        const formData = new FormData(form);
        const jsonObject = {};
        formData.forEach((value, key) => {
            jsonObject[key] = value;
        });


        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'PUT',
                body: JSON.stringify(jsonObject),
                headers: {"Content-Type": "application/json"}
            });

            if (response.ok) {
                location.reload();
            } else {
                console.error('Error al guardar los cambios.');
            }

        } catch (error) {
            console.error('problema con el envio de la solicitud', error);
        }
    });
});

buttonJobDeleteUsers.addEventListener('click', async (event) => {
    event.preventDefault()
    let url = 'api/users'
    const form = document.getElementById('formLastLogin')
    const formData = new FormData(form);
    const jsonObject = {};
    formData.forEach((value, key) => {
        jsonObject[key] = parseInt(value);
    });

    try {

        if(jsonObject.limitSeconds > 0) url += `?limitSeconds=${jsonObject.limitSeconds}`



        if (window.confirm("¿Estás seguro de que deseas iniciar la tarea?")) {
            const response = await fetch(url, {
                method: 'DELETE',
                body: {},
                headers: {}
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                alert(JSON.stringify(jsonResponse, null, 2));
                window.location.reload();

            } else {
                console.error('Error al guardar los cambios.');
            }
        }


    } catch (error) {
        console.error('problema con el envio de la solicitud', error);
    }

});