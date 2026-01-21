import { obtenerBebidas } from "../scripts/getData.js";
let bebidasData = []

const stockDeBebidas = async () => {
    const bebidas = await obtenerBebidas();
    bebidasData = bebidas;

    const tablaDeStock = document.getElementById("stockTable");
    tablaDeStock.innerHTML = `
        <thead>
            <tr>
                <th scope="col">Id_alimento</th>
                <th scope="col">Id_bebida</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Variedad</th>
                <th scope="col">stock</th>
            </tr>
        </thead>
    `;

    bebidas.forEach(bebida => {
        const tbody = document.createElement("tbody")
        const row = document.createElement("tr");
        const id_alimento = bebida.id_alimento;

        row.innerHTML = `
            <td>${id_alimento}</td>
            <td>${bebida.id_bebida}</td>
            <td>${bebida.descripcion}</td>
            <td>${bebida.variedad}</td>
            <td>${bebida.stock}</td>
        `;
        tbody.appendChild(row)
        tablaDeStock.appendChild(tbody)
    });
}
export { stockDeBebidas };
stockDeBebidas();  
