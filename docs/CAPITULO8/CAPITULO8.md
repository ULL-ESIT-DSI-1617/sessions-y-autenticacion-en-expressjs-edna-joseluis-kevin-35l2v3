# ***Administración de cookies en Express***

## ¿Qué es una cookie?

Las cookies son pequeñas porciones de datos enviadas por un sitio web y que son almacenadas en el navegador del usuario mientras éste navega por dicho sitio web. Cada vez que el usuario vuelve a ese sitio web, el navegador envía esas porciones de datos a la página web o servidor para conocer la actividad previa del usuario en ese sitio web.


## ¿Qué es Express?

Express es un framework de aplicaciones web NodeJS, minimal y flexible, que proporciona un conjunto robusto de características para aplicaciones web y móviles.
Para más información visite la página [expressjs.com](http://expressjs.com/).


## Instalación

Por ahora sabemos qué son las cookies y cómo hacer una aplicación Express. En los siguientes apartados veremos cómo usar las cookies en Express, así que lo primero que debemos hacer es instalar el middleware *cookie-parser* con ***npm*** en el directorio ***node_modules***, el cual lo podemos encontrar en el directorio de nuestra aplicación. Para realizar la instalación:

1. Abrimos una terminal,
2. Navegamos hasta el directorio de la aplicación,
3. Ejecutamos el siguiente comando:
~~~sh
    $ npm install cookie-parser
~~~
(Añadir la opción *--save* si se desea que la dependencia se guarde en el fichero *package.json*.)

[cookie-parser](https://github.com/expressjs/cookie-parser)


## Usando Cookie-Parser

Para poder usar el paquete *cookie-parser* simplemente debemos importarlo en nuestra aplicación:

~~~js
    var express = require('express');
    var cookieParser = require('cookie-parser');

    var app = express();
    app.use(cookieParser());
~~~


## Sintaxis

Cookie-parser analiza el encabezado Cookie y rellena **req.cookies** con objeto marcado con los nombres de las cookies. Para establecer una nueva cookie, podemos definir una nueva ruta en la aplicación Express:

~~~js
    app.get('/cookie',function(req, res){
        res.cookie(cookie_name , 'cookie_value').send('Cookie is set');
    });
~~~

Para comprobar si la cooke ha sido establecida o no, ve a la consola del navegador y escribe **document.cookie**.

El navegador envía la cookie de vuelta al servidor cada vez que realiza una petición al sitio web. Y para ver una cookie que el navegador pueda estar enviando al servidor adjuntándola a la cabecera de la petición, podemos escribir el siguiente código:

~~~js
    app.get('/', function(req, res) {
        console.log("Cookies :  ", req.cookies);
    });
~~~


## ¿Cómo establecer el tiempo de expiración de las cookies?

El tiempo de expiración de las cookies se puede establecer fácilmente con:

~~~js
    res.cookie(name , 'value', {expire : new Date() + 9999});
~~~

Las opciones de suma de cookies se pueden establecer pasando un objeto como argumento que lleva configuraciones adicionales para las cookies. Entonces, para establecer el tiempo de expiración de las cookies, se puede enviar un objeto con propiedad de expiración que contiene el tiempo de expiración en milisegundos.

Un enfoque alternativo es usar la propiedad opcional **magAge**.

~~~js
    res.cookie(name, 'value', {maxAge : 9999});
~~~


## ¿Cómo eliminar cookies existentes?

Las cookies existentes se pueden borrar fácilmente usando el método **clearCookie**, que recibe el nombre de la cookie que se quiere eliminar.

~~~js
    app.get('/clearcookie', function(req,res){
        clearCookie('cookie_name');
        res.send('Cookie deleted');
    });
~~~

Ahora se podría ir a la consola del navegador y comprobar que la cookie especificada ha sido eliminada.
