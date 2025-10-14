const agregarPedido = (alimentosDelPedido) => {
    const form = document.getElementById("order");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        //const datos = new FormData(form);
        
        alimentosDelPedido.forEach(alimento => {
            const mesa = document.getElementById("mesaNro")
        const nro_mesa = parseInt(mesa.innerText);
        const cantidadStr = document.getElementById("cantidad");
        const cantidad = parseInt(cantidadStr.innerText);
            const id_alimento = alimento.id;
            console.log(cantidad)
            console.log(nro_mesa)
            console.log(id_alimento)
            console.log(alimentosDelPedido)
            window.api.guardarPedido(nro_mesa, id_alimento, cantidad);
        });
        //const nro_mesa = datos.get("mesaNro");
        //const nro_mesa = parseInt(datos.get("mesaNro"));
        //const alimento = datos.get("nombre");
        //const cantidad = datos.get("cantidad"); 
        // console.log(cantidad)
        // console.log(nro_mesa)
        // console.log(id)
        // console.log(alimentosDelPedido)

        // alimentosDelPedido.forEach(alimento => {
        //     const nro_mesa = datos.get("mesa");
        //     const cantidad = datos.get("cantidad");
        //     const { id_alimento, variedad } = alimento;
        //     console.log("Hola")
        //console.log(nro_mesa)
        //     console.log(cantidad)
        
        // });
        const tabla = document.querySelector('#order-table');
        tabla.innerHTML = '';
        form.reset();
        
    });
}
export { agregarPedido }