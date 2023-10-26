const ALERT = document.getElementById("ALERT");

function generarTimestampID() {
    return Date.now();
}

export function ToasteMessag(message) {
    const elemento = document.createElement("li");
    elemento.textContent = message
    const id_message = generarTimestampID();
    elemento.id = id_message
    ALERT.appendChild(elemento)

    setTimeout(() => {
        const elementoAEliminar = document.getElementById(id_message);
        if (elementoAEliminar) {
            ALERT.removeChild(elementoAEliminar);
        }
    }, 3000); // 5000 ms = 5 segundos

    return true
}