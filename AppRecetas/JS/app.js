const selectcategorias = document.getElementById("categorias");
const resultado = document.getElementById("resultado");
const favoritosDiv = document.querySelector('.favoritos');

function iniciarApp() {
    if (selectcategorias) {
        selectcategorias.addEventListener("change", buscarCategoria);
        obtenerCategorias();
    }

    if (favoritosDiv) {
        obtenerFavoritos();
    }

    function obtenerCategorias() {
        const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => LlenarCategorias(resultado.categories))
            .catch(error => console.log("Error al buscar categorías:", error));
    }

    function LlenarCategorias(categorias = []) {
        categorias.forEach(categoria => {
            const option = document.createElement("option");
            option.value = categoria.strCategory;
            option.textContent = categoria.strCategory;
            selectcategorias.appendChild(option);
        });
    }

    function buscarCategoria(e) {
        e.preventDefault();
        mostrarSpinner();
        const categoria = e.target.value;
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;

        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => {
                MostrarRecetas(resultado.meals);
                ocultarSpinner();
            })
            .catch(error => console.error('Error al buscar recetas:', error));
    }

    function recetaModal(id) {
        const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => {
                const receta = resultado.meals[0];
                const modalTitulo = document.querySelector(".modal-title");
                const modalInstrucciones = document.querySelector(".modal-body");
                const modalfooter = document.querySelector(".modal-footer");
    
                modalTitulo.textContent = receta.strMeal;
                modalInstrucciones.innerHTML = `
                    <img class="modal-img img-fluid mb-3" src="${receta.strMealThumb}" alt="Imagen de la receta">
                    <h5>Instrucciones:</h5>
                    <p>${receta.strInstructions}</p>
                    <h5>Ingredientes:</h5>
                    <ul>
                        ${obtenerIngredientes(receta).map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                `;
    
                modalfooter.innerHTML = ''; // Limpiar botones anteriores
    
                // Botón para agregar a favoritos
                const btn = document.createElement("button");
                btn.classList.add("btn", "btn-success", "w-100");
                btn.textContent = "Agregar a Favoritos";
                btn.onclick = () =>  AgregarFavorito({
                    idMeal: receta.idMeal,
                    strMeal: receta.strMeal,
                    strMealThumb: receta.strMealThumb,
                    strInstructions: receta.strInstructions,
                    strIngredients: obtenerIngredientes(receta)
                });
                modalfooter.appendChild(btn);
    
                // Verificar si la receta ya está en favoritos
                const Favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
                const recetaFavorita = Favoritos.find(fav => fav.idMeal === receta.idMeal);
                
                if (recetaFavorita) {
                    // Si está en favoritos, mostrar el botón de eliminar
                    const btnEliminar = document.createElement("button");
                    btnEliminar.classList.add("btn", "btn-danger", "w-100");
                    btnEliminar.textContent = "Eliminar Favorito";
                    btnEliminar.onclick = () => EliminarFavorito(receta.idMeal);
                    modalfooter.appendChild(btnEliminar);
                }
    
                // Mostrar el modal
                const modal = new bootstrap.Modal(document.getElementById("modal"));
                modal.show();
            })
            .catch(error => console.error('Error al obtener la receta:', error));
    }

    function obtenerIngredientes(receta) {
        const ingredientes = [];
        for (let i = 1; i <= 20; i++) {
            const ingrediente = receta[`strIngredient${i}`];
            const medida = receta[`strMeasure${i}`];
            if (ingrediente) {
                ingredientes.push(`${ingrediente} - ${medida}`);
            }
        }
        return ingredientes;
    }

    function MostrarRecetas(recetas = []) {
        LimpiarHtml(resultado);
    
        const heading = document.createElement("h2");
        heading.classList.add('text-center', 'text-black', 'my-5');
        heading.textContent = recetas.length ? "Resultados" : "No hay Resultados";
        resultado.appendChild(heading);
    
        recetas.forEach(receta => {
            const container = document.createElement("div");
            container.classList.add('col-md-4');
    
            const recetaCard = document.createElement("div");
            recetaCard.classList.add("card", "mb-4");
    
            const recetaimg = document.createElement("img");
            recetaimg.src = receta.strMealThumb;
            recetaimg.alt = `Imagen de la receta ${receta.strMeal}`;
    
            const recetaCardBody = document.createElement("div");
            recetaCardBody.classList.add("card-body");
    
            const recetaHeading = document.createElement("h3");
            recetaHeading.classList.add("card-title", "mb-3");
            recetaHeading.textContent = receta.strMeal;
    
            const recetaButton = document.createElement("a");
            recetaButton.classList.add("btn", "btn-primary", "w-100");
            recetaButton.textContent = "Ver Receta";
            recetaButton.onclick = () => recetaModal(receta.idMeal);
    
            recetaCardBody.appendChild(recetaHeading);
            recetaCardBody.appendChild(recetaButton);
    
            recetaCard.appendChild(recetaimg);
            recetaCard.appendChild(recetaCardBody);
    
            container.appendChild(recetaCard);
    
            resultado.appendChild(container);
        });
    }
    

    function LimpiarHtml(selector) {
        while (selector.firstChild) {
            selector.removeChild(selector.firstChild);
        }
    }

    function mostrarSpinner() {
        const spinner = document.createElement('div');
        spinner.classList.add('spinner-border', 'text-primary');
        spinner.setAttribute('role', 'status');
        resultado.appendChild(spinner);
    }

    function ocultarSpinner() {
        const spinner = document.querySelector('.spinner-border');
        if (spinner) spinner.remove();
    }
    function EliminarFavorito(id) {
        const Favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        const nuevosFavoritos = Favoritos.filter(fav => fav.idMeal !== id);
    
        localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
    
        Toastify({
            text: "¡Receta eliminada de Favoritos!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#f44336",
            stopOnFocus: true,
        }).showToast();
    
        // Si estás en la sección de favoritos, actualizar la lista
        if (favoritosDiv) {
            LimpiarHtml(favoritosDiv);
            obtenerFavoritos();
        }
        const modal = bootstrap.Modal.getInstance(document.getElementById("modal"));
         modal.hide();
    }

    function AgregarFavorito(receta) {
        const Favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        const existe = Favoritos.some(fav => fav.id === receta.id);

        if (!existe) {
            Favoritos.push(receta);
            localStorage.setItem("favoritos", JSON.stringify(Favoritos));
            Toastify({
                text: "¡Receta agregada a Favoritos!",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#4caf50",
                stopOnFocus: true,
            }).showToast();
        } else {
            Toastify({
                text: "¡Ya está en tus Favoritos!",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#f44336",
                stopOnFocus: true,
            }).showToast();
        }
    }

    function obtenerFavoritos() {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        if (favoritos.length) {
            MostrarRecetas(favoritos);
        } else {
            const noFavoritos = document.createElement('P');
            noFavoritos.textContent = 'No hay favoritos aún';
            noFavoritos.classList.add('fs-4', 'text-center', 'font-bold', 'mt-5');
            favoritosDiv.appendChild(noFavoritos);
        }
    }
}

document.addEventListener("DOMContentLoaded", iniciarApp);
