const API_URL = 'https://fakestoreapi.com/products';

export async function getProducts() {
    try {
        let response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Error ${response.status} al pedir los productos`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getCategories() {
    try {
        let response = await fetch(`${API_URL}/categories`);

        if (!response.ok) {
            throw new Error(`Error ${response.status} al pedir las categorias`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}
