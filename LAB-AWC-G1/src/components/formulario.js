import { getTotalCarrito, getCantidadTotal, vaciarCarrito } from "../storage.js";
import { notificacion } from "./notificacion.js";

export function formularioCompra(alFinalizar) {
    let container = document.querySelector('#checkout-modal');
    let total = getTotalCarrito().toFixed(2);
    let cantidad = getCantidadTotal();

    let template = `
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title fs-5" id="checkout-modalLabel">Finalizar compra</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar formulario"></button>
                </div>

                <form id="form-compra" novalidate>
                    <div class="modal-body">
                        <div class="alert alert-secondary d-flex justify-content-between align-items-center" role="status">
                            <span>${cantidad} producto(s) en el carrito</span>
                            <span class="fw-bold">USD $${total}</span>
                        </div>

                        <div class="row g-3">
                            <div class="col-12">
                                <label for="nombre" class="form-label">Nombre y apellido</label>
                                <input type="text" class="form-control" id="nombre" name="nombre" required minlength="3" autocomplete="name">
                                <div class="invalid-feedback">Ingresa tu nombre y apellido (minimo 3 caracteres).</div>
                            </div>

                            <div class="col-md-7">
                                <label for="email" class="form-label">Correo electronico</label>
                                <input type="email" class="form-control" id="email" name="email" required autocomplete="email">
                                <div class="invalid-feedback">Ingresa un correo valido, por ejemplo nombre@correo.com</div>
                            </div>

                            <div class="col-md-5">
                                <label for="telefono" class="form-label">Telefono</label>
                                <input type="tel" class="form-control" id="telefono" name="telefono" required pattern="[0-9]{8,}" autocomplete="tel">
                                <div class="invalid-feedback">Solo numeros, minimo 8 digitos.</div>
                            </div>

                            <div class="col-12">
                                <label for="direccion" class="form-label">Direccion</label>
                                <input type="text" class="form-control" id="direccion" name="direccion" required minlength="5" autocomplete="street-address">
                                <div class="invalid-feedback">Ingresa la calle y el numero.</div>
                            </div>

                            <div class="col-md-7">
                                <label for="ciudad" class="form-label">Ciudad</label>
                                <input type="text" class="form-control" id="ciudad" name="ciudad" required autocomplete="address-level2">
                                <div class="invalid-feedback">Ingresa tu ciudad.</div>
                            </div>

                            <div class="col-md-5">
                                <label for="codigoPostal" class="form-label">Codigo postal</label>
                                <input type="text" class="form-control" id="codigoPostal" name="codigoPostal" required pattern="[0-9]{4,}" autocomplete="postal-code">
                                <div class="invalid-feedback">Solo numeros, minimo 4 digitos.</div>
                            </div>

                            <div class="col-12">
                                <label for="pago" class="form-label">Forma de pago</label>
                                <select class="form-select" id="pago" name="pago" required>
                                    <option value="">Elegi una opcion</option>
                                    <option value="tarjeta">Tarjeta de credito</option>
                                    <option value="debito">Tarjeta de debito</option>
                                    <option value="transferencia">Transferencia bancaria</option>
                                    <option value="efectivo">Efectivo al recibir</option>
                                </select>
                                <div class="invalid-feedback">Selecciona una forma de pago.</div>
                            </div>

                            <div class="col-12">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="terminos" name="terminos" required>
                                    <label class="form-check-label" for="terminos">Acepto los terminos y condiciones</label>
                                    <div class="invalid-feedback">Debes aceptar los terminos para continuar.</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-dark">Confirmar compra</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    container.innerHTML = template;

    const bootstrapModal = new bootstrap.Modal(container);
    let form = document.querySelector('#form-compra');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        let nombre = form.nombre.value.trim().split(' ')[0];

        bootstrapModal.hide();
        vaciarCarrito();
        alFinalizar();
        notificacion(`Gracias por tu compra, ${nombre}! Total: USD $${total}`);
    });

    bootstrapModal.show();
}
