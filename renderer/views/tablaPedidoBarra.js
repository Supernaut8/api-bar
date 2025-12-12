const tablaDePedido = (pedidosBebidas) => {
    const tablaPedidosBebidas = document.getElementById("orderBarTable");
    const pieDeTabla = document.createElement("tfoot");
    // const botonAceptar = document.createElement("button");
    // botonAceptar.setAttribute( "id", "aceptar");
    
    let total = 0;
    
    tablaPedidosBebidas.innerHTML = `
        <thead>
            <tr>
                <th>Unidades</th>
                <th>Id_Alimento</th>
                <th>Stock</th>
                <th>Descripcion</th>
                <th>Variedad</th>
                <th>PrecioUnit</th>
                <th>Precio</th>
            </tr>
        </thead>
    `;

    pedidosBebidas.forEach(pedido => {
        let precioUnitario = Math.round(pedido.precio);
        const tbody = document.createElement("tbody");
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${pedido.cantidad}</td>
            <td>${pedido.id}</td>
            <td>${pedido.stock - pedido.cantidad}</td>
            <td>${pedido.descripcion}</td>
            <td>${pedido.variedad}</td>
            <td>${precioUnitario}</td>
            <td>${precioUnitario * pedido.cantidad}</td>
        `;
        total = total + precioUnitario * pedido.cantidad;
        tbody.appendChild(row);
        tablaPedidosBebidas.appendChild(tbody);
    });

    pieDeTabla.innerHTML =  `
        <tr>
                <th>Total</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>${total}</th>
        </tr>
        `   
    tablaPedidosBebidas.appendChild(pieDeTabla);
}

export { tablaDePedido }