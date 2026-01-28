const tablaDePedido = (pedidos, totalPedido) => {
    const tablaPedidos = document.getElementById("orderBarTable");
    const pieDeTabla = document.createElement("tfoot");
    
    tablaPedidos.innerHTML = `
        <thead>
            <tr>
                <th>Unidades</th>
                <th>Stock</th>
                <th>Descripcion</th>
                <th>Precio X Unidad</th>
                <th>Precio Total</th>
            </tr>
        </thead>
    `;

    pedidos.forEach(pedido => {
        const tbody = document.createElement("tbody");
        const row = document.createElement("tr");
        row.innerHTML = `
            <td id="cantidad">${pedido.cantidad}</td>
            <td>${pedido.stock - pedido.cantidad}</td>
            <td id="nombre">${pedido.nombre}</td>        
            <td>$${pedido.precioUnit}</td>
            <td>$${pedido.subtotal}</td>
        `;
        // total = total + precioUnitario * pedido.cantidad;
        tbody.appendChild(row);
        tablaPedidos.appendChild(tbody);
    });

    pieDeTabla.innerHTML = `
        <tr>
                <th>Total</th>
                <th></th>
                <th></th>
                <th></th>
                <th>$${totalPedido}</th>
        </tr>
        `
    tablaPedidos.appendChild(pieDeTabla);
}

export { tablaDePedido }