
let comidasData = [];

const tablaDeComidas = () => {
    const comidas = window.api.obtenerMenus();
    comidasData = comidas;
    console.log(comidasData)
    
    const listadoDecomidas = document.getElementById("comidasTable");
    listadoDecomidas.innerHTML = `
        <thead>
            <tr>
                <th scope="col">Id_Comida</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Variedad</th>
                <th scope="col">Precio</th>
                <th scope="col">Modificar</th>
            </tr>
        </thead>
    `;

    comidas.forEach(comida => {
        const tbody = document.createElement("tbody")
        const row = document.createElement("tr");
        const id_alimento = comida.id_alimento
        console.log(id_alimento)

        row.innerHTML = `
            <td>${comida.id_menu}</td>
            <td>${comida.variedad}</td>
            <td>${comida.descripcion}</td>
            <td>${comida.precio}</td>
            <td>
                <button class="btn btn-warning" onclick="editarComida(${comida.id})">Editar</button>
                <button class="btn btn-danger" onclick="eliminarComida(${comida.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row)
        listadoDecomidas.appendChild(tbody);
    });
}

export { tablaDeComidas };

// Llamar a la función para cargar la tabla al inicio
tablaDeComidas();   