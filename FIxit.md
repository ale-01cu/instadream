* El Buscador.
* El sistema de archivos.
* Cuando se cierra sesion se rompe.
* Cuando expira el token manejarlo bien.
* Limpiar las imagenes del formulario para add las publications cuando se cierre el modal.
* Arreglar las imagenes de las publications.
* Bajar la resolucion de las imagenes que se suben al servidor.

### Codigo para el tema de las imagnes
const input = document.querySelector('input[type="file"]');
input.addEventListener('change', function() {
  const file = this.files[0];
  const img = new Image();
  img.onload = function() {
    alert(`La resolución de la imagen es ${this.width} x ${this.height}`);
  };
  img.src = URL.createObjectURL(file);
});