window.addEventListener('DOMContentLoaded', async () => {
  const mesaList = document.getElementById('mesa-list');
  const mesaSelect = document.getElementById('mesa-select');
  const form = document.getElementById('comanda-form');
  const detalleInput = document.getElementById('detalle');

  const mesas = await window.api.getMesas();

  mesas.forEach(mesa => {
    // Para lista
    const li = document.createElement('li');
    li.textContent = mesa.nombre;
    mesaList.appendChild(li);

    // Para el select
    const option = document.createElement('option');
    option.value = mesa.id;
    option.textContent = mesa.nombre;
    mesaSelect.appendChild(option);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const mesaId = mesaSelect.value;
    const detalle = detalleInput.value;

    await window.api.agregarComanda(mesaId, detalle);
    alert('Comanda agregada');
    detalleInput.value = '';
  });
});
