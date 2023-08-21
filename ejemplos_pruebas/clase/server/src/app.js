import express from 'express';
const app = express();
app.get('/saludo', (req, res) => {
    res.send("Hola mundo! Express")
});
const user = {
    name: 'Juan',
    age: 30,
    address: {
        city: 'New York',
        state: 'NY'
    }
};
app.get('/bienvenida', (req, res) => {
    res.send("<span style='color:green'>Hola! Te doy la bienvenida</span>");
});
app.get('/usuario', (req, res) => {
    res.send(user)
});
app.listen(8080, () => {
    console.log("Server running on port 8080");
})
