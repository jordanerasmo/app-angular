### Aplicacion Angular

######Aplicacion de tipo ABM, desarrollada con Angular 16, y utilizando una fuente de datos desde JsonServer.

##### Descripcion

- Tabla donde se muestra el id, marca, modelo, año y motor de los vehiculos.
- Formulario en el que se puede registrar un nuevo vehiculo. El mismo tambien funciona como formulario de edicion.
- Boton para guardar un vehiculo nuevo o modificar un vehiculo existente.
- Boton para resetear los campos del formulario.
- Boton para eliminar vehiculo.
- Boton para editar los datos de un vehiculo.

##### Utilidades en el proyecto
- Biblioteca PrimeNg para utilizacion de los componentes.
- Formularios reactivos con FormBuilder para la validacion de los campos. 
- Tabla con paginacion
- Para el patron redux se usa el paquete NGRX, donde se opera con:
	- Store
	- Actions
	- Reducer
	- Selectors
- Paquete Store-Devtools en conjunto con la extension Redux-Devtools de Chrome y Firefox:
https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=es

##### Instrucciones de uso:

- 1) Clonar repositorio y seleccionar rama "redux-develop"
- 2) En la consola, ubicarnos en la direccion ".../AppAngular/app-angular"
- 3) Ejecutar el comando "npm run serverAPI", para correr JsonServer 
- 4) Abrimos otra consola y ejecutamos el comando "NgServe" y abrir en el navegador el directorio "Localhost:*Puerto" con el puerto que indique la consola (generamente 4200)