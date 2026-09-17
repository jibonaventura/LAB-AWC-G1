export function contador(id) {

    let template = `
        <div class="d-flex justify-content align-items-center gap-3 my-5">
            <button id="decrementarBtn-${id}" class="btn btn-secondary">-</button>
            <span id="contador-${id}">1</span>
            <button id="incrementarBtn-${id}" class="btn btn-secondary">+</button>
        </div>
    `;

    return template;
}


export function addEventListener(id, cantidad) {
    let btnIncrementar = document.querySelector(`#incrementarBtn-${id}`);
    let btnDecrementar = document.querySelector(`#decrementarBtn-${id}`);
    let spanContador = document.querySelector(`#contador-${id}`);

    btnIncrementar.addEventListener('click', () => {
        cantidad++;
        spanContador.textContent = cantidad;
    })

    btnDecrementar.addEventListener('click', () => {
        if (cantidad > 1) {
            cantidad--;
            spanContador.textContent = cantidad;
        }
    })

}
