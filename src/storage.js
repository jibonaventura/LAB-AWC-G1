const STORAGE_KEY = 'cart';

export function inicioLocStorage() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
}

export function getLocalStorage() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveLocalStorage(item) {
    let cart = getLocalStorage();
    cart.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function setPrdLocalStorage(item) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(item));
}

export function actualizarPrdLocalStorage(itemIndice, qty) {
    let dataStorage = getLocalStorage();
    let indice = dataStorage.findIndex((p) => p.id == itemIndice);

    if (indice != -1) {
        dataStorage[indice].qty += qty;
        setPrdLocalStorage(dataStorage);
    }

    return indice;
}

export function cambiarQtyLocalStorage(id, qty) {
    let dataStorage = getLocalStorage();
    let indice = dataStorage.findIndex((p) => p.id == id);

    if (indice == -1) {
        return;
    }

    if (qty <= 0) {
        dataStorage.splice(indice, 1);
    } else {
        dataStorage[indice].qty = qty;
    }

    setPrdLocalStorage(dataStorage);
}

export function eliminarPrdLocalStorage(id) {
    let dataStorage = getLocalStorage().filter((p) => p.id != id);
    setPrdLocalStorage(dataStorage);
}

export function vaciarCarrito() {
    setPrdLocalStorage([]);
}

export function getTotalCarrito() {
    return getLocalStorage().reduce((total, p) => total + (p.price * p.qty), 0);
}

export function getCantidadTotal() {
    return getLocalStorage().reduce((total, p) => total + p.qty, 0);
}
