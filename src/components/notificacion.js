export function notificacion(mensaje, tipo = 'success') {
    let container = document.querySelector('#toast-container');
    let id = `toast-${Date.now()}`;

    let template = `
        <div class="toast align-items-center text-bg-${tipo} border-0" id="${id}" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">${mensaje}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar notificacion"></button>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', template);

    let toastEl = document.querySelector(`#${id}`);
    let toast = new bootstrap.Toast(toastEl, { delay: 3000 });

    toast.show();

    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
}
