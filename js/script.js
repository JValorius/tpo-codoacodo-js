window.addEventListener('DOMContentLoaded', () => {
    // Ruta del archivo JSON
    const jsonFile = 'simulate/clinicas.json?page=1&limit=10';
    console.log('FILE RECOVERED');
    // Realizar la petición GET para obtener el archivo JSON
    fetch(jsonFile)
      .then(response => response.json())

      .then(data => displayJsonContent(data))

      .catch(error => {
        console.error('Error al obtener el archivo JSON:', error);
      });
  
    
    function displayJsonContent(jsonData) {
      // Obtener el elemento HTML donde se mostrará el contenido del JSON
      const jsonContentElement = document.getElementById('lista-clinicas');
      const mainUL = document.createElement('ul');
      for(let i = 0; i < jsonData.length; i++) {
        const nomClinica = document.createElement('li');
        nomClinica.innerHTML = jsonData[i].nombre;
        console.log(jsonData[i].nombre);
        const datosClinicaUL = document.createElement('ul');

        const telClinica = document.createElement('li');
        telClinica.innerHTML = jsonData[i].telefono;
        datosClinicaUL.appendChild(telClinica);
        
        const dirClinica = document.createElement('li');
        dirClinica.innerHTML = jsonData[i].direccion + ", "+ jsonData[i].localidad;
        datosClinicaUL.appendChild(dirClinica);
        
        const rates = document.createElement('li');
        rates.innerHTML = "Puntajes:";

        const ratesUL = document.createElement('ul');
        for(let i = 0; i < 3; i++) {
          const rateLI = document.createElement('li');
          if (i === 1) {
            rateLI.innerHTML = jsonData[i].rate_edil;
          } else if (i === 2) {
            rateLI.innerHTML = jsonData[i].rate_medi;
          } else {
            rateLI.innerHTML = jsonData[i].rate_serv;
          }
          ratesUL.appendChild(rateLI);
        }

        rates.appendChild(ratesUL);

        datosClinicaUL.appendChild(rates);

        nomClinica.appendChild(datosClinicaUL);

        mainUL.appendChild(nomClinica);

      }
  
      jsonContentElement.appendChild(mainUL);

    }

  });