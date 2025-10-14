const tablaDeMenus = (comidas) => {
    
    const listadoDeMenus = document.getElementById("aggregate-table1");
    listadoDeMenus.innerHTML = `        
        <tr>
            <th>Id_Menu</th>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>Precio</th>
        </tr>   
              
    `;
    comidas.forEach((comida, index) => {
        const filaListado = document.createElement("tr");
        filaListado.innerHTML =`
            <td>${index + 1}</td>
            <td>${comida.tipo}</td>
            <td>${comida.descripcion}</td>
            <td>${comida.costoUnit}</td>
        `;
        listadoDeMenus.appendChild(filaListado);
    });
}
export {tablaDeMenus}