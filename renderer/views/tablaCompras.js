const tablaDeCompras = (bebidas) => {
    
    const listadoDeCompra = document.getElementById("aggregate-table");
    listadoDeCompra.innerHTML = `        
        <tr>
            <th>Id_Artículo</th>
            <th>Proovedor</th>
            <th>Unidades</th>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>PrecioUnit</th>
            <th>Precio</th>
        </tr>   
              
    `;
    bebidas.forEach((bebida, index) => {
        const filaListado = document.createElement("tr");
        filaListado.innerHTML =`
            <td>${index + 1}</td>
            <td>${bebida.proveedor}</td>
            <td>${bebida.cantidad}</td>
            <td>${bebida.variedad}</td>
            <td>${bebida.descripcion}</td>
            <td>${bebida.costoUnit}</td>
            <td>${bebida.costoUnit * bebida.cantidad}</td>
        `;
        listadoDeCompra.appendChild(filaListado);
    });
}
export {tablaDeCompras}

