document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("carrito-contenedor");
    const totalCompra = document.getElementById("total-compra");

    function cargarCarrito() {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        contenedor.innerHTML = "";
        let total = 0;

        carrito.forEach((item, index) => {
            const subtotal = item.price * item.cantidad;
            total += subtotal;

            const productoDiv = document.createElement("div");
            productoDiv.classList.add("producto-carrito");

            productoDiv.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="producto-info">
                    <div class="producto-nombre">${item.name}</div>
                    <div class="producto-precio">$${item.price.toFixed(2)}</div>
                </div>
                <div class="producto-cantidad">
                    <button class="restar" data-index="${index}">-</button>
                    <span>${item.cantidad}</span>
                    <button class="sumar" data-index="${index}">+</button>
                </div>
                <div class="producto-precio">$${subtotal.toFixed(2)}</div>
                <button class="btn-eliminar" data-index="${index}">🗑</button>
            `;

            contenedor.appendChild(productoDiv);
        });

        totalCompra.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Sumar cantidad
    contenedor.addEventListener("click", e => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        if (e.target.classList.contains("sumar")) {
            carrito[e.target.dataset.index].cantidad++;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            cargarCarrito();
        }
        if (e.target.classList.contains("restar")) {
            if (carrito[e.target.dataset.index].cantidad > 1) {
                carrito[e.target.dataset.index].cantidad--;
                localStorage.setItem("carrito", JSON.stringify(carrito));
                cargarCarrito();
            }
        }
        if (e.target.classList.contains("btn-eliminar")) {
            carrito.splice(e.target.dataset.index, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            cargarCarrito();
        }
    });

    // Vaciar carrito
    document.getElementById("btn-vaciar").addEventListener("click", () => {
        localStorage.removeItem("carrito");
        cargarCarrito();
    });

    // Comprar
    document.getElementById("btn-comprar").addEventListener("click", () => {
        alert("¡Gracias por tu compra!");
        localStorage.removeItem("carrito");
        window.location.href = "/html/index.html";
    });

    // Volver a index
    document.getElementById("btn-volver").addEventListener("click", () => {
        window.location.href = "/html/index.html"
    });

    cargarCarrito();
});
