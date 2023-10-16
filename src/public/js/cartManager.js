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


        const url = "http://localhost:8080/api/cart/"+cartId+"/product/"+productid


        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => {
                ToasteMessag("added: "+ productid)
            })
            .catch(error => console.error('error', error));



    });
});