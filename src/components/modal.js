import { actualizarPrdLocalStorage, getLocalStorage, saveLocalStorage, setPrdLocalStorage } from "../storage.js";
import { addEventListener, contador } from "../components/contador.js";
import { listaCarrito} from "../components/listaCarrito.js";    

export function Modal(prod) {
    let container = document.querySelector('#product-modal');

    let template = `
<div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">${prod.title}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
    <div class="modal-body">
        <div class = "row">
            <div class = "col-md-6">
            <img src = "${prod.image}" class = "img-fluid" alt = "${prod.title}">
            </div>
                <div class = "col-md-6">
                <p>${prod.description}</p>
            </div>
                <div class = " col-12 d-flex justify-content-end align-items-start">
                <h5>Precio: USD $${prod.price}</h5>
                ${contador(prod.id)}
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" id="addToCartBtn-${prod.id}">Agregar al carrito</button>
    </div>
</div>
    `;

    container.innerHTML = template;

    //Logica Carrito local storage
    addEventListener(prod.id, 1);

    let btnAddToCart = document.querySelector(`#addToCartBtn-${prod.id}`);
    btnAddToCart.addEventListener('click', () => {
       let inptQty = document.querySelector(`#contador-${prod.id}`);
       let qty = Number(inptQty.textContent);

       let indice = actualizarPrdLocalStorage(prod.id, qty);

       if (indice == -1) {
            prod.qty = qty;
            saveLocalStorage(prod);
       }

       listaCarrito();
    })

    const bootstrapModal = new bootstrap.Modal(container);
    bootstrapModal.show();
}