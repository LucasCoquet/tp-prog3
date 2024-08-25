//Ejercicio 1
const fs = require('fs');

// Variable para la URL de la API
const API_URL = "https://thronesapi.com/api/v2/Characters";

// Punto 1
const recuperarPersonaje = async (nombrePersonaje) => {
    try {
        const datos = await fetch(API_URL);
        const personajes = await datos.json(); 

        // para filtrar personaje 
        const personaje = personajes.find(p => p.fullName === nombrePersonaje);

        if (personaje) {
            console.log(`Información acerca del personaje ${nombrePersonaje}:`, personaje);
        } else {
            console.log(`Personaje con el nombre ${nombrePersonaje} no encontrado.`);
        }
    } catch (error) {
        console.error("Error al recuperar los datos:", error);
    }
};

// Punto 2
const personajesDisponibles = async () => {
    try {
        const datos = await fetch(API_URL);
        const personajes = await datos.json(); 

        console.log("Personajes disponibles: ", personajes); 

        // Punto 3
        fs.writeFile("personajes.json", JSON.stringify(personajes, null, 2), (error) => {
            if (error) {
                console.error("Error al guardar el archivo JSON:", error);
            }
        });
    } catch (error) {
        console.error("Error al recuperar los datos:", error);
    }
};

// Punto 4a
const mostrarFamiliaStark = () => {
    fs.readFile('./personajes.json', 'utf8', (error, data) => {
        if (error) {
            console.error('Error al leer el archivo JSON:', error);
            return;
        }

        try {
            const personajes = JSON.parse(data);

            // Filtrar familia Stark
            const personajesStark = personajes.filter(personaje => personaje.family === "House Stark");

            console.log("Personajes de la familia Stark:");
            personajesStark.forEach(personaje => {
                console.log(personaje);
            });
        } catch (error) {
            console.error('Error al procesar los datos JSON:', error);
        }
    });
};

// Punto 4b
const agregarPersonaje = (nuevoPersonaje) => {
    fs.readFile('./personajes.json', 'utf8', (error, data) => {
        if (error) {
            console.error('Error al leer el archivo JSON:', error);
            return;
        }

        try {
            const personajes = JSON.parse(data);

            // push para aggregar nuevo personaje
            personajes.push(nuevoPersonaje);

            const jsonString = JSON.stringify(personajes, null, 2);
            fs.writeFile('./personajes.json', jsonString, (error) => {
                if (error) {
                    console.error('Error al sobrescribir el archivo JSON:', error);
                } else {
                    console.log('Personaje agregado y archivo JSON sobrescrito exitosamente.');
                    imprimirPersonajes();
                }
            });
        } catch (error) {
            console.error('Error al procesar los datos JSON:', error);
        }
    });
};

//4c
const eliminarPersonajes = async () => {
    try {
        const data = await fs.promises.readFile('./personajes.json', 'utf8');
        const personajes = JSON.parse(data);
        const personajesFiltrados = personajes.filter(personaje => personaje.id < 25);

        const jsonString = JSON.stringify(personajesFiltrados, null, 2);

        await fs.promises.writeFile('./personajes.json', jsonString);
        console.log('Personajes con ID mayores o iguales a 25 eliminados y archivo JSON sobrescrito');
    } catch (error) {
        console.error('Error al leer, filtrar o sobrescribir el archivo JSON:', error);
    }
};

const imprimirPersonajes = () => {
    fs.readFile('./personajes.json', 'utf8', (error, data) => {
        if (error) {
            console.error('Error al leer el archivo JSON:', error);
            return;
        }

        try {
            const personajes = JSON.parse(data);
            console.log("Todos los personajes:");
            personajes.forEach(personaje => {
                console.log(personaje);
            });
        } catch (error) {
            console.error('Error al procesar los datos JSON:', error);
        }
    });
};

recuperarPersonaje("Ned Stark");
personajesDisponibles();
mostrarFamiliaStark();

const nuevoPersonaje = {
    fullName: "Lucas Coquet",
    title: "King in the North",
    family: "House Stark"
};
agregarPersonaje(nuevoPersonaje);
eliminarPersonajes();
