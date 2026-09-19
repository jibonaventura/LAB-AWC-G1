import { getCategories } from "../api.js";

export async function renderCategorias(alSeleccionar) {
    let container = document.querySelector('#category-filter');
    let categorias = await getCategories();

    let template = `
        <li class="nav-item">
            <button type="button" class="btn btn-dark btn-sm categoria-btn active" data-categoria="todos">Todos</button>
        </li>
    `;

    categorias.forEach((categoria) => {
        template += `
            <li class="nav-item">
                <button type="button" class="btn btn-outline-dark btn-sm categoria-btn text-capitalize" data-categoria="${categoria}">${categoria}</button>
            </li>
        `;
    });

    container.innerHTML = template;

    container.addEventListener('click', (e) => {
        let boton = e.target.closest('.categoria-btn');

        if (!boton) {
            return;
        }

        container.querySelectorAll('.categoria-btn').forEach((btn) => {
            btn.classList.remove('active', 'btn-dark');
            btn.classList.add('btn-outline-dark');
        });

        boton.classList.add('active', 'btn-dark');
        boton.classList.remove('btn-outline-dark');

        alSeleccionar(boton.dataset.categoria);
    });
}
