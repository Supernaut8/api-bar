const agregaBebidas = () => {
    const selectBebidas = document.getElementById('alimentoBebidas');
    const alimentosData = window.api.obtenerAlimentos();
    const bebidas = alimentosData.filter(alimento => alimento.esBebida == 1);
    console.log(bebidas)
    selectBebidas.innerHTML = '<option value="">Seleccione una opción</option>';
    bebidas.forEach(bebida => {
        const option = document.createElement('option');
        option.value = bebida.id;
        option.textContent = bebida.nombre;
        selectBebidas.appendChild(option);
    });

    selectBebidas.addEventListener('change', (event) => {
        const bebidaId = event.target.value;
        const bebida = bebidas.find(b => b.id == bebidaId);
        if (bebida) {
            console.log(`Bebida seleccionada: ${bebida.nombre}`);
        }
    });
}
export { agregaBebidas }

agregaBebidas();