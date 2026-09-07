import {getProducts} from "../api.js";
import {Modal} from "./modal.js";

export function RenderCards() {
    let productList = document.querySelector('#product-list');
    let searchBar = document.querySelector('#search-bar');

    getProducts().then((products) => {

    const displayProducts = (items) => {        
        
        let template = '';
        items.forEach((p) => {
            template += `
            <div class = "col">
                <div class = "card justify-content-center align-items-center" style = "width: 300px;">
                    <img src = "${p.image}" class = "card-img-top" alt = "${p.title}" style = "height: 400px; width: 250px; object-fit: contain;" >
                    <div class = "card-body" style = "width: 300px;">
                        <h4 class = "card-title text-truncate">${p.title}</h4>
                    </div>
                    <div class = "mb-2">
                        <button class = "btn btn-dark" id = "btn-${p.id}">Ver Detalle</button>
                    </div>
                </div>  
            </div>
            `;
        });

        productList.innerHTML = template;

        items.forEach((p) => {
            let btn = document.querySelector(`#btn-${p.id}`);
            if (btn) {
            btn.addEventListener('click', () => Modal(p));
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