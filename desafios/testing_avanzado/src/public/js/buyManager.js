const botonCompra = document.getElementById("buy-button");
const modalConfirmacion = document.getElementById("modal-confirmacion");
const confirmarCompraButton = document.getElementById("confirmar-compra");
const cancelarCompraButton = document.getElementById("cancelar-compra");
const irAProductosButton = document.getElementById("ir-a-productos");

botonCompra.addEventListener("click", function() {
    // Mostrar el modal de confirmación
    modalConfirmacion.style.display = "block";
});

confirmarCompraButton.addEventListener("click", function() {
    // Cerrar el modal de confirmación
    modalConfirmacion.style.display = "none";

    const cartIdElement = document.getElementById("cart_id");
    const cartId = cartIdElement.textContent.trim();

    // Realizar la solicitud POST con Fetch
    fetch(`http://localhost:8080/api/cart/${cartId}/purchase`, {
        method: "POST",
        headers: {}
    })
        .then(response => {

            if ([404].includes(response.status)) {
                alert("Carrito vacío!!!, te redirigimos a productos...")
                window.location.href = "http://localhost:8080/products?page=1";
            }

            return response.json()
        })
        .then(data => {
            if (data && data.message === "success") {
                // Mostrar el modal de éxito y llenar los campos
                modal.style.display = "block";
                document.getElementById("modal-description").textContent = data.response.description;
                document.getElementById("modal-code").textContent = data.response.code;
                document.getElementById("modal-amount").textContent = data.response.amount;
                document.getElementById("modal-purchaser").textContent = data.response.purchaser;
                document.getElementById("modal-purchase-datetime").textContent = data.response.purchase_datetime;
            } else {
                console.error('No fue posible realizar la compra.');
            }
        })
        .catch(error => {
            console.error("Error al realizar la compra:", error);
        });
});

cancelarCompraButton.addEventListener("click", function() {
    // Cerrar el modal de confirmación
    modalConfirmacion.style.display = "none";
});

irAProductosButton.addEventListener("click", function() {
    // Redirigir a la página de productos
    window.location.href = "http://localhost:8080/products?page=1";
});
