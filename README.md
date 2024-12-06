# Proyecto Recetas y Favoritos

Este proyecto es una aplicación web que permite a los usuarios buscar recetas, ver detalles de cada una y guardarlas en una lista de favoritos. Los usuarios pueden agregar y eliminar recetas de sus favoritos directamente desde el modal de detalles de la receta.

# Preview
<img src="https://github.com/CristhoferR1/RecetasWeb/blob/main/assets/Inicio.jpg?raw=true" width="60%" style="width: 100%; height: auto; object-fit: contain;" />
<img src="https://github.com/CristhoferR1/RecetasWeb/blob/main/assets/filtrado-categoria.jpg?raw=true" width="60%" style="width: 100%; height: auto; object-fit: contain;" />
<img src="https://github.com/CristhoferR1/RecetasWeb/blob/main/assets/favoritos-modal.jpg?raw=true" width="60%" style="width: 100%; height: auto; object-fit: contain;" />



## Características

- **Búsqueda de Recetas:** Los usuarios pueden buscar recetas por nombre usando la API de TheMealDB.
- **Detalles de la Receta:** Al hacer clic en una receta, el usuario puede ver los detalles completos, incluyendo ingredientes e instrucciones.
- **Favoritos:** Los usuarios pueden agregar recetas a sus favoritos. Las recetas favoritas se almacenan en el `localStorage` del navegador.
- **Eliminar de Favoritos:** Desde el modal de detalles de la receta, los usuarios pueden eliminar recetas de su lista de favoritos.

## Tecnologías Usadas

- **HTML**: Para la estructura de la página.
- **CSS**: Para los estilos y diseño, usando Bootstrap para la responsividad.
- **JavaScript**: Para la interactividad de la página, manejo de eventos y lógica del frontend.
- **API**: TheMealDB API para obtener las recetas y sus detalles.
- **localStorage**: Para almacenar las recetas favoritas de los usuarios.

## Instalación

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone https://github.com/CristhoferR1/RecetasWeb.git
    ```

2. Abre el archivo `index.html` en tu navegador para ver el proyecto en funcionamiento.

## Uso

1. **Buscar recetas:**
    - Ingresa la Categoria que buscas en las disponibles
    - Los resultados de la búsqueda se mostrarán en tarjetas con el nombre y la imagen de cada receta.

2. **Ver detalles de una receta:**
    - Haz clic en una tarjeta de receta para abrir un modal con los detalles completos de la receta, incluyendo instrucciones y lista de ingredientes.

3. **Agregar a favoritos:**
    - Dentro del modal de detalles de la receta, haz clic en el botón **"Agregar a Favoritos"** para guardar la receta en tu lista de favoritos.

4. **Eliminar de favoritos:**
    - Si la receta ya está en tus favoritos, verás un botón **"Eliminar de Favoritos"** en el modal. Haz clic en este botón para eliminarla de tu lista de favoritos.


## Contribuciones

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Fork este repositorio.
2. Crea una nueva rama para tu característica (`git checkout -b feature/mi-nueva-caracteristica`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva característica'`).
4. Envía un push a tu rama (`git push origin feature/mi-nueva-caracteristica`).
5. Crea un nuevo pull request.





