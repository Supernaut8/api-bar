import { obtenerBebidas } from "../scripts/getData.js";

let bebidasData = [];

const tablaDeBebidas = async () => {
    const bebidas = await obtenerBebidas();
    bebidasData = bebidas;
    console.log(bebidasData)
    
    const listadoDeBebidas = document.getElementById("bebidasTable");
    listadoDeBebidas.innerHTML = `
        <thead>
            <tr>
                <th scope="col">Id_Bebida</th>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Modificar</th>
            </tr>
        </thead>
    `;

    bebidas.forEach(bebida => {
        const tbody = document.createElement("tbody");
        const row = document.createElement("tr");
        const id_alimento = bebida.id_alimento
        console.log(id_alimento)

        row.innerHTML = `
            <td>${bebida.id_bebida}</td>
            <td>${bebida.descripcion}</td>
            <td>${bebida.precio}</td>
            <td>
                <button class="btn btn-warning" id="(${bebida.id})">Editar</button>
                <button class="btn btn-danger" onclick="eliminarBebida(${bebida.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row)
        listadoDeBebidas.appendChild(tbody);
    });

    document.addEventListener('click', (e) => {

    })
}

export { tablaDeBebidas };

// Llamar a la función para cargar la tabla al inicio
tablaDeBebidas();   