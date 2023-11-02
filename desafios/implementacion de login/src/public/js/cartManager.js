
var raw = "";

var requestOptions = {
    method: 'POST',
    body: raw,
    redirect: 'follow'
};


const cartID = document.getElementById("cartId");
const addToCartButtons = document.querySelectorAll(".addToCart");
const ALERT = document.getElementById("ALERT");

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
                const elemento = document.createElement("li");
                elemento.textContent = "added: "+ productid
                elemento.id = productid
                ALERT.appendChild(elemento)

                setTimeout(() => {
                    const elementoAEliminar = document.getElementById(productid);
                    if (elementoAEliminar) {
                        ALERT.removeChild(elementoAEliminar);
                    }
                }, 3000); // 5000 ms = 5 segundos

            })
            .catch(error => console.log('error', error));



    });
});
