const form = document.getElementById('registro-form');

form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);

    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if ([200, 201].includes(result.status)) {
            window.location.replace('/users/login')
        }
    })
})