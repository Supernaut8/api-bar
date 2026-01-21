const tablaDePedido = (pedidosBebidas) => {
    const tablaPedidosBebidas = document.getElementById("orderBarTable");
    const pieDeTabla = document.createElement("tfoot");
    let total = 0;
    
    tablaPedidosBebidas.innerHTML = `
        <thead>
            <tr>
                <th>Unidades</th>
                <th>Stock</th>
                <th>Descripcion</th>
                <th>Variedad</th>
                <th>Precio X Unidad</th>
                <th>Precio Total</th>
            </tr>
        </thead>
    `;

    pedidosBebidas.forEach(pedido => {
        let precioUnitario = pedido.precio;
        const tbody = document.createElement("tbody");
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${pedido.cantidad}</td>
            <td>${pedido.stock - pedido.cantidad}</td>
            <td>${pedido.descripcion}</td>
            <td>${pedido.variedad}</td>
            <td>$${precioUnitario}</td>
            <td>$${precioUnitario * pedido.cantidad}</td>
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
                <th>$${total}</th>
        </tr>
        `   
    tablaPedidosBebidas.appendChild(pieDeTabla);
}

export { tablaDePedido }