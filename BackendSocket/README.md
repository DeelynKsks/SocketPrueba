<h1 align="center">Bienvenid@ a mi examen parcial de</h1>


![](https://github.com/DeelynKsks/Parcial_Fernandez_Jeremias/blob/main/img/380534.png?raw=true)

## Hola, soy Fernández Jeremías, o por mi alias, Deelyn.
### Este es el desarollo de mi examen parcial
### Consiste en un servidor capaz de crear, consultar, actualizar y eliminar usuarios, y tareas
---
- ## Antes que nada asegúrese de tener instalado node.js

- ### Como punto a considerar, las funcionalidades de este servidor y su aplicación se logran mediante peticiones realizadas manualmente.

---

Para ejecutar el servidor, primero hay que instalar las dependencias correspondientes utilizando el comando

```
npm i
```
en la consola, dentro de la carpeta correspondiente donde haya extraído/clonado este repositorio.

---

Luego puede proceder a ejecutar el siguiente comando en la consola para iniciar el servidor

```
npm run dev
```

En algunos casos puede que el servidor deje de funcionar por un error, para iniciarlo de nuevo puede presionar ctrl + c en la consola para cerrarlo (Algunas veces pide que se confirme el cierre y otras no), o, puede escribir rs en la consola para reiniciar el servidor
---

## Para realizar las peticiones necesitará un programa llamado postman
- Asegúrese de descargarlo e instalarlo
- Postman es un programa que permite hacer peticiones http y devolver respuesstas a esas peticiones
- Una vez dentro del programa deberá crear un espacio de trabajo y agregar una nueva petición, como bien lo muestro en la imagen de abajo

![image](https://user-images.githubusercontent.com/73413595/196175116-107931ff-0506-4492-a1a9-26dd546c1d26.png)
---
![image](https://user-images.githubusercontent.com/73413595/196174921-e1784eac-027e-473d-8a34-1f298e6fe790.png)
---
## Una vez creada la petición, tiene que enviarla, para eso primero irá al apartado **headers**
- Cree un header con estas características, ya que lo que hace es aclarar que la petición enviará contenido de tipo JSON, que es precisamente el tipo que contenido que acepta este servidor al realizar peticiones.
---
![image](https://user-images.githubusercontent.com/73413595/196175924-37a24ac9-24f3-4feb-a3dd-dd5122bd9cb9.png)
---
- Luego en el apartado body, seleccione raw, y seleccione JSON, así
![image](https://user-images.githubusercontent.com/73413595/196176561-4508486c-7039-4503-af0d-8acafeb8f6b3.png)
---



### ACLARACIÓN IMPORTANTE: A medida que vaya probando el servidor, enviará datos en formato JSON, las cuales, como buen objeto, tienen una clave. Siempre utilice las claves que aparecen en los ejemplos, no es lo mismo
```
{
    "username":
}
```
### que
```
{
    "nombre de usuario":
}
```
### Al menos, no para el servidor.
---
## 1) Bueno, ya teniendo el servidor corriendo, y el postman configurado, puede hacer las peticiones incrustando la url del servidor (Por lo general es http://localhost:7000, suponiendo que la persona que esté leyendo esto no lo haya cambiado) para cada una de las rutas

### a) Comience por crear un usuario

- ### Escriba la url del servidor con la ruta /user al final (Esta ruta será utilizada para las operaciones CRUD de los usuarios)
- ### Como va a **ENVIAR DATOS** seleccione primero la petición POST
- ### Luego, en el body, escriba en formato JSON el /username/, /password/ & /email/ que enviará, como por ejemplo:
```
{
    "username":"Persona",
    "password":"contraseña",
    "email":"estoesunejemplo@gmail.com"
}
```
- ### Envie la petición

### Como puntos a tomar en cuenta con esta petición:
- No tiene validaciones con respecto a los datos que se envíen, salvo que estén vacíos, y con eso no me refiero a un string vacío (En el caso de la contraseña, sí o sí necesita ser un string).
- La contraseña se encripta, así que sería bueno que recordase la contraseña, porque no la podrá consultar, o al menos no podrá ser legible si lo hace.

## 2) Inicie sesión para poder realizar las demás peticiones con la ruta /login

### a) Empiece por generar la sesión

- ### Seleccione la petición POST
- ### En el body escriba en formato JSON el username & password que creó o que están en la base de datos. Utilizando de ejemplo el usuario anterior:
```
{
    "username":"Persona",
    "password":"contraseña"
}
```
- ### Envie la petición
- ### Copie la serie de carácteres a los que llamaremos "token", que, se le dió como respuesta en caso de que haya hecho todo bien

### b) Inicie sesión con el token

- ### Vaya al apartado headers y cree una clave llamada Authorization, y en el valor, incruste el token que se le dio

### Como punto a tomar en cuenta con esta petición:
- No se requiere el email, por lo que solo deberá limitarse al username & password

## 3) Consulte, actualice, y elimine un usuario utilizando de nuevo la ruta /user

### a) Consultar usuarios

- ### Seleccione la petición GET
- ### Envie la petición

### Como punto a tomar en cuenta con esta petición:
- Puede enviar la petición con o sin algo en el body, es indiferente porque trae a todos los usuarios siempre y cuando el que haga la consulta tenga el token activo

### b) Actualice un usuario

- ### Seleccione la petición PUT
- ### A la ruta /user agréguele el id del usuario, por ejemplo:
![image](https://user-images.githubusercontent.com/73413595/196194806-092f85e4-763d-46aa-be3d-7ceb59e036b3.png)

- ### En el body, escriba en formato JSON los datos que quiera actualizar, limitándose solo a los que utilizó (username, password, email), como por ejemplo:

```
{
    "username":"Persona1",
    "password:"contraseña2",
    "email":"estoesunejemplo3@gmail.com"
}
```

- ### Envie la petición

### Como puntos a tomar en cuenta con esta petición:
- Sin el id de usuario no se podrá hacer esta petición así que le aparecerá un código html de error hasta que lo haga correctamente
- No son necesarias las 3 claves, puede simplemente modificar el usuario, o la contrasñea, o el email, o dos claves sin necesidad de la tercera, no es necesario actualizar todo si no lo hará 

### c) Elimine un usuario

- ### Seleccione la petición delete
- ### A la ruta /user agréguele el id del usuario
- ### Envíe la petición

### Como punto a tomar en cuenta con esta petición:
- Esta petición no elimina al usuario en sí, realiza un Soft Delete, que sería igual a esconderlo. En este servidor el soft delete funciona así: Los usuarios tienen una clave de objeto llamada isActive, que sí o sí tiene que ser booleano, este Soft Delete actualiza la propiedad del isActive a /false/. El GET y el PUT solo toman a los usuarios que estén activos, es decir, que tengan /true/ como propiedad en el isActive

## 4) Cree, consulte, actualice y elimine tareas utilizando la ruta /task

### a) Crear tareas

- ### Seleccione la petición POST
- ### En el body, escriba en formato JSON el /titulo/ & /descripcion/ que enviará, como por ejemplo:

```
{
    "titulo":"Comer",
    "descripcion":"Ingerir alimentos"
}
```
- ### Envie la petición

### Como puntos a tomar en cuenta con esta petición:
- Se requiere sí o sí un token de sesión para realizar esta y las demás peticiones de tareas
- Cuando se crea una tarea, también se crea una clave llamada isDone, la cual es booleana y, por defecto viene como /false/. Esto determina el estado de la tarea, si está terminada

### b) Consultar tareas

- ### Seleccione la petición GET
- ### Envíe la petición

### c) Actualizar tareas

- ### Seleccione la petición PUT
- ### A la ruta /task, agruéguele el id de la tarea
- ### En el body, escriba en formato JSON el titulo, descripción & /isDone/ que va a actualizar, como por ejemplo

```
{
    "titulo":"Comer más",
    "descripcion":"Ingerir más alimentos"
    "isDone":true
}
```
- ### Envíe la consulta

### Como puntos a tomar en cuenta con esta petición:
- Solo se podrán actualizar las tareas que hayan sido creadas por el usuario correspondiente. En caso de tener el id de la tarea y querer actualizarla desde el token de otro usuario, no va a funcionar.
- No son necesarias las 3 claves, puede simplemente modificar el titulo, o la descripcion, o el isDone, o dos claves sin necesidad de la tercera, no es necesario actualizar todo si no lo hará

### d) Eliminar tareas

- ### Seleccione la petición DELETE
- ### A la ruta /task, agréguele el id de la tarea
- ### Envíe la petición

### Como puntos a tomar en cuenta con esta petición:
- Al igual que con el DELETE de usuario, este es un Soft Delete, lo que quiere decir no se elimina la tarea en sí, solo pasa del estado true(activo) a false(inactivo)
- Y al igual que con el PUT de tareas, no podrá eliminar ninguna tarea que no corresponda al usuario que la creó
---

<h1 align="center">Eso es todo, disfrute del servidor y pruébelo.</h1>
