console.log('Hola mono')

var raw = "";

var requestOptions = {
    method: 'POST',
    body: raw,
    redirect: 'follow'
};


const cartID = document.getElementById("cartId");
const addToCartButtons = document.querySelectorAll(".addToCart");

// Agrega un evento de clic a cada botón
addToCartButtons.forEach(button => {
    button.addEventListener("click", function() {
        // Este código se ejecutará cuando se haga clic en un botón "addToCart"
        const productid = button.id;
        const cartId = cartID.textContent
        console.log(cartId)

        const url = "http://localhost:8080/api/cart/"+cartId+"/product/"+productid

        console.log(url)
        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                alert(`Has agregado "${productid}" al carrito id ${cartID.textContent}`);
            })
            .catch(error => console.log('error', error));



    });
});