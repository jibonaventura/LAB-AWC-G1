import {getProducts} from "../api.js";
import {Modal} from "./modal.js";

export function RenderCards() {
    let productList = document.querySelector('#product-list');
    let searchBar = document.querySelector('#search-bar');

    getProducts().then((products) => {

    const displayProducts = (items) => {   
        
    if (items.length === 0) {
        productList.innerHTML = `
            <div class="col-12 w-100 text-center py-5">
                <p class="fs-4 text-muted fw-semibold m-0">No se encontraron productos :(</p>
            </div>
            `;
        return;
    }
        
        let template = '';
        items.forEach((p) => {
            template += `
                <div class="col">
                    <div class="card h-100 shadow-sm product-card" id="card-${p.id}" style="cursor: pointer;">
                        <img src="${p.image}" class="card-img-top" alt="${p.title}" style="height: 200px; object-fit: contain; padding: 1rem;">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <h5 class="card-title text-truncate fs-6" title="${p.title}">${p.title}</h5>
                            <button class="btn btn-dark w-100 mt-2">Ver Detalle</button>
                        </div>
                    </div> 
                </div>
            `;
        });

        productList.innerHTML = template;

        items.forEach((p) => {
            let card = document.querySelector(`#card-${p.id}`);
            if (card) {
            card.addEventListener('click', () => Modal(p));
            }
        });
    };

    displayProducts(products);

    searchBar.addEventListener('input', (e) => {
            const search = e.target.value.toLowerCase().trim();
            const filtered = products.filter(p => 
                p.title.toLowerCase().includes(search)
            );
            displayProducts(filtered);
        });
    });
}