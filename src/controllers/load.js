rutaStates = ''

fetch(ruta)
    .then(response => response.json())
    .then(data => {
        const persona = new Persona(data.nombre, data.edad, data.ciudad);
        console.log(persona); // Aquí se imprimirá el objeto Persona
    })
    .catch(error => {
        console.error('Error al leer el archivo JSON: ', error);
    });