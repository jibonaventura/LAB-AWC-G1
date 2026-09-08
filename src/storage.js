const  STORAGE_KEY = 'cart';

export function inicioLocStorage() {
    if (!localStorage.getItem(STORAGE_KEY)){
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
}

export function getLocalStorage() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
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