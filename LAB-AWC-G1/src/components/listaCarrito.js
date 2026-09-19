import {
    getLocalStorage,
    cambiarQtyLocalStorage,
    eliminarPrdLocalStorage,
    vaciarCarrito,
    getTotalCarrito,
    getCantidadTotal
} from "../storage.js";
import { notificacion } from "./notificacion.js";
import { formularioCompra } from "./formulario.js";

export function listaCarrito() {
    let container = document.querySelector('.offcanvas-body');
    let dataStorage = getLocalStorage();

    actualizarBadge();

    if (dataStorage.length === 0) {
        container.innerHTML = `
            <div class="text-center text-muted mt-5">
                <i class="bi bi-cart-x fs-1" aria-hidden="true"></i>
                <p class="mt-3">Tu carrito esta vacio</p>
            </div>
        `;
        return;
    }

    let template = '';

    dataStorage.forEach((element) => {
        let precioFinal = (element.price * element.qty).toFixed(2);

        template += `
            <article class="card mb-3">
                <div class="row g-0 align-items-center">
                    <div class="col-4">
                        <img src="${element.image}" class="img-fluid rounded-start p-2 carrito-img" alt="${element.title}">
                    </div>
                    <div class="col-8">
                        <div class="card-body py-2 px-3">
                            <h3 class="card-title fs-6 text-truncate" title="${element.title}">${element.title}</h3>
                            <p class="card-text mb-2"><small class="text-body-secondary">USD $${element.price.toFixed(2)} c/u</small></p>
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <div class="btn-group btn-group-sm" role="group" aria-label="Cantidad de ${element.title}">
                                    <button type="button" class="btn btn-outline-secondary" data-accion="restar" data-id="${element.id}" aria-label="Quitar una unidad de ${element.title}" ${element.qty <= 1 ? 'disabled' : ''}>-</button>
                                    <span class="btn btn-outline-secondary disabled" aria-live="polite">${element.qty}</span>
                                    <button type="button" class="btn btn-outline-secondary" data-accion="sumar" data-id="${element.id}" aria-label="Agregar una unidad de ${element.title}">+</button>
                                </div>
                                <button type="button" class="btn btn-outline-danger btn-sm border-0" data-accion="borrar" data-id="${element.id}" aria-label="Eliminar ${element.title} del carrito">
                                    <i class="bi bi-trash3-fill" aria-hidden="true"></i>
                                </button>
                            </div>
                            <p class="fw-bold mb-0 text-end">USD $${precioFinal}</p>
                        </div>
                    </div>
                </div>
            </article>
        `;
    });

    template += `
        <hr>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="fs-5 fw-bold">Total</span>
            <span class="fs-5 fw-bold">USD $${getTotalCarrito().toFixed(2)}</span>
        </div>
        <div class="d-grid gap-2">
            <button type="button" class="btn btn-dark" id="finalizarCompra">Finalizar compra</button>
            <button type="button" class="btn btn-outline-danger" id="vaciarCarrito">Eliminar todos los productos</button>
        </div>
    `;

    container.innerHTML = template;

    agregarEventos(container);
}

function agregarEventos(container) {
    container.querySelectorAll('[data-accion]').forEach((boton) => {
        boton.addEventListener('click', () => {
            let id = boton.dataset.id;
            let accion = boton.dataset.accion;
            let producto = getLocalStorage().find((p) => p.id == id);

            if (!producto) {
                return;
            }

            if (accion === 'sumar') {
                cambiarQtyLocalStorage(id, producto.qty + 1);
            }

            if (accion === 'restar' && producto.qty > 1) {
                cambiarQtyLocalStorage(id, producto.qty - 1);
            }

            if (accion === 'borrar') {
                eliminarPrdLocalStorage(id);
                notificacion(`Eliminaste "${producto.title}" del carrito`, 'danger');
            }

            listaCarrito();
        });
    });

    document.querySelector('#vaciarCarrito').addEventListener('click', () => {
        vaciarCarrito();
        listaCarrito();
        notificacion('Eliminaste todos los productos del carrito', 'danger');
    });

    document.querySelector('#finalizarCompra').addEventListener('click', () => {
        let offcanvasEl = document.querySelector('#offcanvasRight');
        let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);

        if (offcanvas) {
            offcanvas.hide();
        }

        formularioCompra(listaCarrito);
    });
}

function actualizarBadge() {
    let badge = document.querySelector('#cart-badge');
    let cantidad = getCantidadTotal();

    badge.textContent = cantidad;
    badge.classList.toggle('d-none', cantidad === 0);
}
