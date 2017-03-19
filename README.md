# Práctica 5: Sessions y Autenticación en ExpressJS


## Requisitos

* Cree un servidos que use para proveer autenticación a los HTML generados a partir de un libro de prueba.

* Encripte los passwords en un fichero *users.json* (puede usar *bcrypt-nodejs*) en el que se guardan las parejas *usuario: password*.

* Puede escribir un programa auxiliar que le genere el fichero de claves *users.json*.

* Use un formulario *form* para obtener el usuario y la clave.

* Use vistas en *ejs* o *pug* para el programa.

* Deberá tener rutas y vistas para *logout* y para cambiar el password.

* Despliegue la aplicación en Heroku y en la máquina virtual del IaaS.

## Recursos

* [Repositorio con ejemplos de uso de cookies en express](https://github.com/ULL-ESIT-DSI-1617/express-cookies-examples)
* El ejemplo [staticauth.js](https://github.com/ULL-ESIT-DSI-1617/express-cookies-examples/blob/master/staticauth.js) es similar a lo que se pide.
    * En este ejemplo el [directorio gbookexample](https://github.com/ULL-ESIT-DSI-1617/express-cookies-examples/tree/master/gbookexample) contiene los markdown fuente para el libro.
    * El libro es compilado con: *gitbook build gbookexample/ public/*.
    * De manera que los HTML se montan en la ruta *content* y se sirven desde el direcorio *public*.
* Tiene un ejemplo de formulario en la vista *[login.ejs](https://github.com/ULL-ESIT-DSI-1617/express-cookies-examples/blob/master/views/login.ejs)* que es usada por el ejemplo *[auth-example.js](https://github.com/ULL-ESIT-DSI-1617/express-cookies-examples/blob/master/auth-example.js#L99-L101)*.
* [Descripción de la Práctica: Evaluar Manejo de Rutas en ExpressJS](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/practicas/practicalearningcookies.html).
* [Apuntes sobre Cookies y Sessions](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/cookies/).

## Aplicación

[Despliegue en Heroku](https://sessions-auten-expressjs.herokuapp.com/) - Edna Liliana Galiano Camacho

[Despliegue en Heroku](https://sessionyautenticacion.herokuapp.com/) - José Luis Doblado González

[Despliegue en Heroku](https://sessions-autenticacion-express.herokuapp.com/) - Kevin Estévez Expósito

[Despliegue en Iaas]() - Edna Liliana Galiano Camacho

[Despliegue en Iaas](http://10.6.128.96:8086/) - Kevin Estévez Expósito

## A tener en cuenta

El fichero de claves contiene tres pares *usuario: clave* por defecto que, desde la aplicación, no podrán ser eliminados ni tampoco podrán modificar sus contraseñas. De esta forma se garantiza que siempre habrá alguna cuenta con la que iniciar sesión. Estos 3 pares se guardan en el fichero de claves con la contraseña encriptada, nunca se guardarán contraseñas sin encriptar, y son los siguientes:

   * edna: ednapassword
   * joseluis: joseluispassword
   * kevin: kevinpassword

El resto de usuarios que se registren podrán ser eliminados y podrán también cambiar sus contraseñas.

## Asignatura DSI ULL

[Desarrollo de Sistemas Informáticos](https://campusvirtual.ull.es/1617/course/view.php?id=1136)

## Enlace descripción Práctica

[Práctica 5](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/practicas/practicasessions.html)

## Autores

José Luis Doblado González  
* [Github](https://github.com/alu0100767001)
* [Pagina personal](https://alu0100767001.github.io/dsi-joseluis/)


Edna Liliana Galiano Camacho  
* [Github](https://github.com/ednagc)
* [Pagina personal](https://ednagc.github.io/edna-galiano/)

Kevin Estévez Expósito  
* [Github](https://github.com/alu0100821390)
* [Pagina personal](http://alu0100821390.github.io)
