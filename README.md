# G-1 SHOP

E-commerce desarrollado como trabajo practico para la materia **Laboratorio de Aplicaciones Web Cliente** (ISTEA).

La aplicacion consume el catalogo de productos de [Fake Store API](https://fakestoreapi.com/) y permite
buscar productos, filtrarlos por categoria, ver el detalle de cada uno y gestionar un carrito de compras
que persiste en el navegador mediante `localStorage`.

## Integrantes

| Integrante | Usuario de GitHub |
|---|---|
| Juan Bonaventura | [@jibonaventura](https://github.com/jibonaventura) |
| Gaston Negrete De La Cruz | [@GastonNegrete](https://github.com/GastonNegrete) |
| Martin | [@Martin46-lab](https://github.com/Martin46-lab) |
| Jaime Valdes | [@superjai3](https://github.com/superjai3) |

## Desarrollo de cada participante

**Juan Bonaventura** — Estructura inicial del repositorio y organizacion modular del proyecto.
Componente de cards para el listado de productos, modal con el detalle (titulo, precio y descripcion)
y barra de busqueda. Diseño y maquetacion de las tarjetas.

**Gaston Negrete De La Cruz** — Componente contador de cantidades para el detalle del producto.
Listado de productos dentro del carrito y logica para sumar y eliminar productos del mismo.
Primera version del manejo de `localStorage`.

**Martin** — Modulo de filtros: navegacion por categorias obtenidas desde la API y su integracion
con el buscador. Logica de finalizar compra y de vaciado completo del carrito.

**Jaime Valdes** — Integracion de los modulos de carrito y filtros sobre la estructura del proyecto.
Persistencia completa en `localStorage` en todas las acciones del carrito. Sistema de notificaciones,
badge de cantidad en la barra de navegacion, precio final por producto y estados deshabilitados de los
botones. Politicas de accesibilidad (etiquetas semanticas, atributos ARIA, textos alternativos),
diseño responsive y documentacion.

## Funcionalidades

- Listado de productos consumidos desde la API y mostrados en cards.
- Modal de detalle por producto con titulo, precio y descripcion.
- Selector de cantidad en el detalle, con el boton de restar deshabilitado en 1.
- Carrito de compras en un sidebar lateral con:
  - imagen, titulo, botones (-) y (+), cantidad, boton eliminar y precio final por producto;
  - precio final calculado como precio por cantidad;
  - total general de la compra.
- Badge en la barra de navegacion con la cantidad total de unidades en el carrito.
- Boton de finalizar compra y boton para eliminar todos los productos. Ambos se ocultan
  cuando el carrito esta vacio.
- Notificaciones al usuario al agregar, eliminar y finalizar la compra.
- Buscador de productos por nombre.
- Navegacion por categorias.
- Persistencia del carrito en `localStorage`: cada accion actualiza el almacenamiento.

## Tecnologias

- HTML5 con etiquetas semanticas (`header`, `nav`, `main`, `section`, `aside`, `footer`).
- CSS3 y [Bootstrap 5](https://getbootstrap.com/), con tipografia Poppins de Google Fonts.
- JavaScript (modulos ES): manipulacion del DOM, Fetch API y Local Storage.
- [Fake Store API](https://fakestoreapi.com/) como origen de datos.

## Estructura del proyecto

```
index.html
src/
├── index.js                    punto de entrada
├── api.js                      consumo de la API
├── storage.js                  manejo de localStorage
├── css/
│   └── styles.css
└── components/
    ├── cards.js                listado de productos y filtros
    ├── categorias.js           navegacion por categorias
    ├── modal.js                detalle del producto
    ├── contador.js             selector de cantidad
    ├── listaCarrito.js         carrito de compras
    └── notificacion.js         mensajes al usuario
```

## Como ejecutar el proyecto

El proyecto usa modulos ES, por lo que debe servirse mediante un servidor web
(abrir `index.html` directamente con doble clic no funciona por las restricciones CORS del navegador).

Con la extension **Live Server** de Visual Studio Code: clic derecho sobre `index.html` y
*Open with Live Server*.

O bien, desde una terminal parada en la carpeta del proyecto:

```bash
python -m http.server 8080
```

Y luego abrir `http://localhost:8080` en el navegador.
