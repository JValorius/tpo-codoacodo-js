window.addEventListener('DOMContentLoaded', () => {
    // Ruta del archivo JSON
    const jsonFile = 'simulate/clinicas.json';
    console.log('FILE RECOVERED');
    // Realizar la petición GET para obtener el archivo JSON
    fetch(jsonFile)
      .then(response => response.json())
      .then(data => {
        // Mostrar el contenido del JSON en la página web
        displayJsonContent(data);
      })
      .catch(error => {
        console.error('Error al obtener el archivo JSON:', error);
      });
  
    function displayJsonContent(jsonData) {
      // Obtener el elemento HTML donde se mostrará el contenido del JSON
      const jsonContentElement = document.getElementById('json-content');
  
      // Convertir el objeto JSON a una cadena formateada
      const jsonStr = JSON.stringify(jsonData, null, 2);
  
      // Mostrar la cadena en el elemento HTML
      jsonContentElement.textContent = jsonStr;
    }
  });