import {ToasteMessag} from "./messageFlash.js";

var raw = "";

var requestOptions = {
    method: 'POST',
    body: raw,
    redirect: 'follow'
};


const cartID = document.getElementById("cartId");
const addToCartButtons = document.querySelectorAll(".addToCart");
// const ALERT = document.getElementById("ALERT");

// Agrega un evento de clic a cada botón
addToCartButtons.forEach(button => {
    button.addEventListener("click", function() {
        // Este código se ejecutará cuando se haga clic en un botón "addToCart"
        const productid = button.id;
        const cartId = cartID.textContent


        const url = "/api/cart/"+cartId+"/product/"+productid


        fetch(url, requestOptions)
            .then(response => {
                if ([200].includes(response.status)){
                    return response.text()
                }
                else {
                    if ([403].includes(response.status)){
                        ToasteMessag("Tu rol no permite agregar productos al carrito")
                        throw Error("Tu rol no permite agregar productos al carrito")
                    }
                    ToasteMessag("Problemas para agregar al carrito "+ productid)
                }
            })
            .then(result => {
                ToasteMessag("added: "+ productid)
            })
            .catch(error => console.error('error', error));



    });
});
