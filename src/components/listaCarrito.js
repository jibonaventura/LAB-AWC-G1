import { getLocalStorage,setPrdLocalStorage } from "../storage.js";

export function listaCarrito() {
    let container = document.querySelector('.offcanvas-body');
    let template = '';
    let dataStorage = getLocalStorage();

    if (dataStorage.length === 0) {
        container.innerHTML = '<p class="text-center text-muted mt-4">Tu carrito está vacío</p>';
        return;
    }

    dataStorage.forEach((element) => {
        template += `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                    <img src="${element.image}" class="img-fluid rounded-start" style="object-fit: contain; height=150px"; alt="${element.title}"">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <div>
                                <h5 class="card-title">${element.title}</h5>
                                <p class="card-text">Cantidad: ${element.qty}</p>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <small class="text-body-secondary">Precio: $${element.price}</small>
                                <button class="btn btn-outline-danger border-0" id="borrarPrd-${element.id}"><i class="bi bi-trash3-fill"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = template;
    });

    eliminarDeCarrito(dataStorage);
}

function eliminarDeCarrito(productosCarrito) {
    productosCarrito.forEach((element) => {
        let btnEliminar = document.querySelector(`#borrarPrd-${element.id}`);
        btnEliminar.addEventListener('click', () =>{
            let nuevoProductosCarrito = productosCarrito.filter((p) => p.id != element.id);
            setPrdLocalStorage(nuevoProductosCarrito);
            listaCarrito();
        });
    });
}