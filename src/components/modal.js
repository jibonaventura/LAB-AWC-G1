import { actualizarPrdLocalStorage, saveLocalStorage } from "../storage.js";
import { addEventListener, contador } from "./contador.js";
import { listaCarrito } from "./listaCarrito.js";
import { notificacion } from "./notificacion.js";

export function Modal(prod) {
    let container = document.querySelector('#product-modal');

    let template = `
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title fs-5" id="product-modalLabel">${prod.title}</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-4">
                        <div class="col-md-5 text-center">
                            <img src="${prod.image}" class="img-fluid modal-img" alt="${prod.title}">
                        </div>
                        <div class="col-md-7">
                            <p class="text-muted small text-capitalize">${prod.category}</p>
                            <p>${prod.description}</p>
                            <p class="fs-4 fw-bold mb-0">USD $${prod.price.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer d-flex flex-wrap justify-content-between align-items-center gap-2">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <div class="d-flex align-items-center gap-3">
                        ${contador(prod.id)}
                        <button type="button" class="btn btn-dark" id="addToCartBtn-${prod.id}">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = template;

    addEventListener(prod.id, 1);

    const bootstrapModal = new bootstrap.Modal(container);

    let btnAddToCart = document.querySelector(`#addToCartBtn-${prod.id}`);

    btnAddToCart.addEventListener('click', () => {
        let inptQty = document.querySelector(`#contador-${prod.id}`);
        let qty = Number(inptQty.textContent);

        let indice = actualizarPrdLocalStorage(prod.id, qty);

        if (indice == -1) {
            saveLocalStorage({ ...prod, qty: qty });
        }

        listaCarrito();
        bootstrapModal.hide();
        notificacion(`Agregaste ${qty} unidad(es) de "${prod.title}" al carrito`);
    });

    bootstrapModal.show();
}
