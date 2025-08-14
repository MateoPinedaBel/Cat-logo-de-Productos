let alertaMostrada = false;

const botonesCarrito = document.querySelectorAll(".tarjeta button");

botonesCarrito.forEach((boton) => {
    boton.addEventListener("click", () => {
        const id = boton.dataset.id;
        const name = boton.dataset.name;
        const price = parseFloat(boton.dataset.price);
        const img = boton.dataset.img;

        // Guardar en localStorage
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const productoExistente = carrito.find(item => item.id === id);

        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({
                id,
                name,
                price,
                img,
                cantidad: 1
            });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));

        // Cambiar texto temporalmente
        const textoOriginal = boton.textContent;
        boton.textContent = "✔ Añadido";
        boton.style.backgroundColor = "#28a745";

        setTimeout(() => {
            boton.textContent = textoOriginal;
            boton.style.backgroundColor = "#ff6f61";
        }, 500);
    });
});
