const tablaDePedido = (pedidos) => {
    const tablaPedido = document.getElementById("order-table")
    // const titulo = document.createElement("caption")
    //tablaPedido.appendChild(titulo)
    tablaPedido.innerHTML = `        
            <tr>
                <th>Mesa</th>
                <th>Unid</th>
                <th>Descripción</th>
                <th>PrecioUnit</th>
                <th>Precio</th>
            </tr>
        
    `
    pedidos.forEach((pedido) => {
        const filaPedido = document.createElement("tr")
        filaPedido.innerHTML = `
            <td>${pedido.mesa}</td>
            <td>${pedido.cantidad}</td>
            <td>${pedido.alimento}</td>        
            <td>$10</td>
            <td>$20</td>
         `
         tablaPedido.appendChild(filaPedido)
    });
}

export {tablaDePedido}