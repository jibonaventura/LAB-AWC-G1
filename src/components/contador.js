export function contador(id) {
    let template = `
        <div class="d-flex align-items-center gap-3" role="group" aria-label="Seleccionar cantidad">
            <button type="button" id="decrementarBtn-${id}" class="btn btn-outline-secondary" aria-label="Quitar una unidad" disabled>-</button>
            <span id="contador-${id}" class="fs-5" aria-live="polite">1</span>
            <button type="button" id="incrementarBtn-${id}" class="btn btn-outline-secondary" aria-label="Agregar una unidad">+</button>
        </div>
    `;

    return template;
}

export function addEventListener(id, cantidad) {
    let btnIncrementar = document.querySelector(`#incrementarBtn-${id}`);
    let btnDecrementar = document.querySelector(`#decrementarBtn-${id}`);
    let spanContador = document.querySelector(`#contador-${id}`);

    const actualizar = () => {
        spanContador.textContent = cantidad;
        btnDecrementar.disabled = cantidad <= 1;
    };

    btnIncrementar.addEventListener('click', () => {
        cantidad++;
        actualizar();
    });

    btnDecrementar.addEventListener('click', () => {
        if (cantidad > 1) {
            cantidad--;
            actualizar();
        }
    });

    actualizar();
}
