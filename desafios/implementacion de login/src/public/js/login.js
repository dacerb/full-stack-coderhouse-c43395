const form = document.getElementById('login-form');
const messageLogin = document.getElementById('message-login');

form.addEventListener('submit', event => {
    messageLogin.innerHTML = '';
    event.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            window.location.replace('/products');
        }

        if (result.status !== 200) messageLogin.innerHTML = 'invalid credentials';

    })
})
