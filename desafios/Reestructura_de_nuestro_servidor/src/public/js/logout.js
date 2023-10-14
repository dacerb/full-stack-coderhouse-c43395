const btnLogout = document.getElementById('logout-btn');

btnLogout.addEventListener('click', () => {

    fetch('/api/sessions/logout', {
        method: 'POST',
        headers: {
        }
    }).then(result => {
        if (result.status === 200) {
            window.location.replace('/users/login');
        }
    })
});
