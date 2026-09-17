import { getProducts } from "../api.js";
import { Modal } from "./modal.js";
import { renderCategorias } from "./categorias.js";

export async function RenderCards() {
    let productList = document.querySelector('#product-list');
    let searchBar = document.querySelector('#search-bar');

    let busqueda = '';
    let categoria = 'todos';

    productList.innerHTML = `
        <div class="col-12 text-center py-5">
            <div class="spinner-border text-dark" role="status">
                <span class="visually-hidden">Cargando productos...</span>
            </div>
        </div>
    `;

    let products = await getProducts();

    if (products === null) {
        productList.innerHTML = `
            <div class="col-12 text-center py-5">
                <p class="fs-5 text-danger fw-semibold m-0">No se pudieron cargar los productos. Revisa tu conexion e intenta de nuevo.</p>
            </div>
        `;
        return;
    }

    const displayProducts = (items) => {
        if (items.length === 0) {
            productList.innerHTML = `
                <div class="col-12 text-center py-5">
                    <p class="fs-4 text-muted fw-semibold m-0">No se encontraron productos :(</p>
                </div>
            `;
            return;
        }

        let template = '';

        items.forEach((p) => {
            template += `
                <div class="col">
                    <article class="card h-100 shadow-sm product-card" data-id="${p.id}">
                        <img src="${p.image}" class="card-img-top" alt="${p.title}" loading="lazy">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <div>
                                <h3 class="card-title text-truncate fs-6" title="${p.title}">${p.title}</h3>
                                <p class="text-muted small text-capitalize mb-2">${p.category}</p>
                            </div>
                            <div>
                                <p class="fw-bold fs-5 mb-2">USD $${p.price.toFixed(2)}</p>
                                <button type="button" class="btn btn-dark w-100">Ver detalle</button>
                            </div>
                        </div>
                    </article>
                </div>
            `;
        });

        productList.innerHTML = template;
    };

    const aplicarFiltros = () => {
        let filtrados = products.filter((p) => {
            let coincideBusqueda = p.title.toLowerCase().includes(busqueda);
            let coincideCategoria = categoria === 'todos' || p.category === categoria;

            return coincideBusqueda && coincideCategoria;
        });

        displayProducts(filtrados);
    };

    productList.addEventListener('click', (e) => {
        let card = e.target.closest('.product-card');

        if (!card) {
            return;
        }

        let producto = products.find((p) => p.id == card.dataset.id);

        if (producto) {
            Modal(producto);
        }
    });

    searchBar.addEventListener('input', (e) => {
        busqueda = e.target.value.toLowerCase().trim();
        aplicarFiltros();
    });

    renderCategorias((categoriaElegida) => {
        categoria = categoriaElegida;
        aplicarFiltros();
    });

    aplicarFiltros();
}
