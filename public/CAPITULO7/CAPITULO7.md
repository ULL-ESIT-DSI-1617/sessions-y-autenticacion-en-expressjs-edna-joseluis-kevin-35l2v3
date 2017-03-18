# ***Rutas en ExpressJS***

## Direccionamiento básico

El ***direccionamiento*** hace referencia a la determinación de cómo responde una aplicación a una solicitud de cliente en un determinado punto final, que es un URI (o una vía de acceso) y un método de solicitud HTTP específico (GET, POST, etc.).

Cada ruta puede tener una o varias funciones de manejador, que se excluyen cuando se correlaciona la ruta.

La definición de ruta tiene la siguiente estructura:

~~~
    app.METHOD(PATH, HANDLER)
~~~

Donde:

* *app* es una instancia de *express*.
* *METHOD* es un [método de solicitud HTTP](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol).
* *PATH* es una vía de acceso en el servidor.
* *HANDLER* es la función que se ejecuta cuando se correlaciona la ruta.

> En esta guía de aprendizaje se supone que se crea una instancia de express denominada app y que el servidor está en ejecución. Si no está familiarizado con la creación y el inicio de una aplicación, consulte el [Ejemplo Hello world](http://expressjs.com/es/starter/hello-world.html).

El siguiente ejemplo ilustra la definición de rutas simples.

Responda con *Hello World!* en la página inicial:

~~~
    app.get('/', function (req, res) {
        res.send('Hello World!')
    })
~~~

Responda a la solicitud POST en la ruta raíz (*/*), la página de inicio de la aplicación:

~~~
    app.post('/', function (req, res) {
        res.send('Got a POST request')
    })
~~~

Responda a una solicitud PUT en la ruta */user*:

~~~
    app.put('/user', function (req, res) {
        res.send('Got a PUT request at /user')
    })
~~~

Responda a una solicitud DELETE en la ruta */user*:

~~~
    app.delete('/user', function (req, res) {
        res.send('Got a DELETE request at /user')
    })
~~~

Para obtener más detalles sobre el direccionamiento, consulte la [guía de direccionamiento](#guía-de-direccionamiento).


## Guía de direccionamiento

***Direccionamiento*** hace referencia a la definición de puntos finales de aplicación (URI) y cómo responden a las solicitudes de cliente. Para ver una introducción al direccionamiento, consulte  [Direccionamiento básico](#direccionamiento-básico).

El siguiente código es un ejemplo de una ruta muy básica.

~~~
    var express = require('express')
    var app = express()

    // respond with "hello world" when a GET request is made to the homepage petición GET a la página principal
    app.get('/', function (req, res) {
        res.send('hello world')
    })
~~~

### Métodos de ruta

Un método de ruta se deriva de uno de los métodos HTTP y se adjunta a una instancia de la clase *express*.

El siguiente código es un ejemplo de las rutas que se definen para los métodos GET y POST a la raíz de la aplicación.

~~~
    // GET method route
    app.get('/', function (req, res) {
        res.send('GET request to the homepage')
    })

    // POST method route
    app.post('/', function (req, res) {
        res.send('POST request to the homepage')
    })
~~~

Express da soporte a los siguientes métodos de direccionamiento que se corresponden con los métodos HTTP: *get*, *post*, *put*, *head*, *delete*, *options*, *trace*, *copy*, *lock*, *mkcol*, *move*, *purge*, *propfind*, *proppatch*, *unlock*, *report*, *mkactivity*, *checkout*, *merge*, *m-search*, *notify*, *subscribe*, *unsubscribe*, *patch*, *search* y *connect*.

> Para direccionar los métodos que se convierten en nombres de variable JavaScript no válidos, utilice la notación entre corchetes. Por ejemplo, *app['m-search']('/', function ...*

Hay un método de direccionamiento especial, *app.all()*, que no se deriva de ningún método HTTP. Este método se utiliza para cargar funciones de middleware en una vía de acceso para todos los métodos de solicitud.

En el siguiente ejemplo, el manejador se ejecutará para las solicitudes a “/secret”, tanto si utiliza GET, POST, PUT, DELETE, como cualquier otro método de solicitud HTTP soportado en el  [módulo http](https://nodejs.org/api/http.html#http_http_methods).

~~~
    app.all('/secret', function (req, res, next) {
        console.log('Accessing the secret section ...')
        next() // pass control to the next handler
~~~

### Vías de acceso de ruta

Las vías de acceso de ruta, en combinación con un método de solicitud, definen los puntos finales en los que pueden realizarse las solicitudes. Las vías de acceso de ruta pueden ser series, patrones de serie o expresiones regulares.

> Express utiliza [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) para correlacionar las vías de acceso de ruta; consulte la documentación de path-to-regexp para ver todas las posibilidades para definir vías de acceso de ruta. [Express Route Tester](http://forbeslindesay.github.io/express-route-tester/?_ga=1.86471069.409263619.1487198698) es una herramienta muy útil para probar rutas básicas de Express, aunque no da soporte a la coincidencia de patrones.

> Las series de consulta no forman parte de la vía de acceso de ruta.

Estos son algunos ejemplos de vías de acceso de ruta basadas en series.

Esta vía de acceso de ruta coincidirá con las solicitudes a la ruta raíz, /.

~~~
    app.get('/', function (req, res) {
        res.send('root')
    })
~~~

Esta vía de acceso de ruta coincidirá con las solicitudes a */about*.

~~~
    app.get('/about', function (req, res) {
        res.send('about')
    })
~~~

Esta vía de acceso de ruta coincidirá con las solicitudes a */random.text*.

~~~
    app.get('/random.text', function (req, res) {
        res.send('random.text')
    })
~~~

Estos son algunos ejemplos de vías de acceso de ruta basadas en patrones de serie.

Esta vía de acceso de ruta coincidirá con *acd* y *abcd*.

~~~
    app.get('/ab?cd', function (req, res) {
        res.send('ab?cd')
    })
~~~

Esta vía de acceso de ruta coincidirá con *abcd*, *abbcd*, *abbbcd*, etc.

~~~
    app.get('/ab+cd', function (req, res) {
        res.send('ab+cd')
    })
~~~

Esta vía de acceso de ruta coincidirá con *abcd*, *abxcd*, *abRANDOMcd*, *ab123cd*, etc.

~~~
    app.get('/ab*cd', function (req, res) {
        res.send('ab*cd')
    })
~~~

Esta vía de acceso de ruta coincidirá con */abe* y */abcde*.

~~~
    app.get('/ab(cd)?e', function (req, res) {
        res.send('ab(cd)?e')
    })
~~~

> Los caracteres ?, +, * y () son subconjuntos de sus contrapartidas de expresiones regulares. El guión (-) y el punto (.) se interpretan literalmente en las vías de acceso basadas en series.

Ejemplos de vías de acceso de ruta basadas en expresiones regulares:

Esta vía de acceso de ruta coincidirá con cualquier valor con una “a” en el nombre de la ruta.

~~~
    app.get(/a/, function (req, res) {
        res.send('/a/')
    })
~~~

Esta vía de acceso de ruta coincidirá con *butterfly* y *dragonfly*, pero no con *butterflyman*, *dragonflyman*, etc.

~~~
    app.get(/.*fly$/, function (req, res) {
        res.send('/.*fly$/')
    })
~~~

### Parámetros de ruta

Los parámetros de ruta son llamados segmentos URL que son usados para capturar los valores especificados en su posición en la URL. Los valores capturados se rellenan en el objeto *req.params*, con el nombre del parámetro de ruta especificado en el *path* así como sus respectivas claves.

~~~
    Route path: /users/:userId/books/:bookId
    Request URL: http://localhost:3000/users/34/books/8989
    req.params: { "userId": "34", "bookId": "8989" }
~~~

Para definir rutas con parámetros de ruta, simplemente se debe especificar los parámetros de ruta en el *path* de la ruta como se muestra a continuación.

~~~
    app.get('/users/:userId/books/:bookId', function (req, res) {
        res.send(req.params)
    })
~~~

Desde que el guión (-) y el punto (.) son interpretados de forma literal, éstos pueden ser utilizados solos con los parámetros de ruta con propósitos muy útiles.

~~~
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }
~~~

~~~
Route path: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }
~~~

### Manejadores de rutas

Puede proporcionar varias funciones de devolución de llamada que se comportan como  [middleware](http://expressjs.com/es/guide/using-middleware.html) para manejar una solicitud. La única excepción es que estas devoluciones de llamada pueden invocar *next('route')* para omitir el resto de las devoluciones de llamada de ruta. Puede utilizar este mecanismo para imponer condiciones previas en una ruta y, a continuación, pasar el control a las rutas posteriores si no hay motivo para continuar con la ruta actual.

Los manejadores de rutas pueden tener la forma de una función, una matriz de funciones o combinaciones de ambas, como se muestra en los siguientes ejemplos.

Una función de devolución de llamada individual puede manejar una ruta. Por ejemplo:

~~~
    app.get('/example/a', function (req, res) {
        res.send('Hello from A!')
    })
~~~

Más de una función de devolución de llamada puede manejar una ruta (asegúrese de especificar el objeto next). Por ejemplo:

~~~
    app.get('/example/b', function (req, res, next) {
        console.log('the response will be sent by the next function ...')
        next()
    }, function (req, res) {
        res.send('Hello from B!')
    })
~~~

Una matriz de funciones de devolución de llamada puede manejar una ruta. Por ejemplo:

~~~
    var cb0 = function (req, res, next) {
        console.log('CB0');
        next();
    }

    var cb1 = function (req, res, next) {
        console.log('CB1');
        next();
    }

    var cb2 = function (req, res) {
        res.send('Hello from C!');
    }

    app.get('/example/c', [cb0, cb1, cb2]);
~~~

Una combinación de funciones independientes y matrices de funciones puede manejar una ruta. Por ejemplo:

~~~
    var cb0 = function (req, res, next) {
        console.log('CB0');
        next();
    }

    var cb1 = function (req, res, next) {
        console.log('CB1');
        next();
    }

    app.get('/example/d', [cb0, cb1], function (req, res, next) {
        console.log('the response will be sent by the next function ...');
        next();
    }, function (req, res) {
        res.send('Hello from D!');
    });
~~~

### Métodos de respuesta

Los métodos en el objeto de respuesta (*res*) de la tabla siguiente pueden enviar una respuesta al cliente y terminar el ciclo de solicitud/respuestas. Si ninguno de estos métodos se invoca desde un manejador de rutas, la solicitud de cliente se dejará colgada.

| Método                                                               | Descripción
| -------------------------------------------------------------------- | ---------------------------------------------- |
| [res.download()](http://expressjs.com/en/4x/api.html#res.download)   | Solicita un archivo para descargarlo.          |
| [res.end()](http://expressjs.com/en/4x/api.html#res.end)             | Finaliza el proceso de respuesta.              |
| [res.json()](http://expressjs.com/en/4x/api.html#res.json)           | Envía una respuesta JSON.                      |
| [res.jsonp()](http://expressjs.com/en/4x/api.html#res.jsonp)         | Envía una respuesta JSON con soporte JSONP.    |
| [res.redirect()](http://expressjs.com/en/4x/api.html#res.redirect)   | Redirecciona una solicitud.                    |
| [res.render()](http://expressjs.com/en/4x/api.html#res.render)       | Representa una plantilla de vista.             |
| [res.send()](http://expressjs.com/en/4x/api.html#res.send)           | Envía una respuesta de varios tipos.           |
| [res.sendFile()](http://expressjs.com/en/4x/api.html#res.sendFile)   | Envía un archivo como una secuencia de octetos.|
| [res.sendStatus](http://expressjs.com/en/4x/api.html#res.sendStatus) | Establece el código de estado de la respuesta y envía su representación de serie como el cuerpo de respuesta. |

### app.route()

Puede crear manejadores de rutas encadenables para una vía de acceso de ruta utilizando *app.route()*. Como la vía de acceso se especifica en una única ubicación, la creación de rutas modulares es muy útil, al igual que la reducción de redundancia y errores tipográficos. Para obtener más información sobre las rutas, consulte: [Documentación de Router](#documentación-de-router).

A continuación, se muestra un ejemplo de manejadores de rutas encadenados que se definen utilizando *app.route()*.

~~~
    app.route('/book')
        .get(function (req, res) {
            res.send('Get a random book')
        })
        .post(function (req, res) {
            res.send('Add a book')
        })
        .put(function (req, res) {
            res.send('Update the book')
        })
~~~

### express.Router

Utilice la clase *express.Router* para crear manejadores de rutas montables y modulares. Una instancia *Router* es un sistema de middleware y direccionamiento completo; por este motivo, a menudo se conoce como una “miniaplicación”.

El siguiente ejemplo crea un direccionador como un módulo, carga una función de middleware en él, define algunas rutas y monta el módulo de direccionador en una vía de acceso en la aplicación principal.

Cree un archivo de direccionador denominado *birds.js* en el directorio de la aplicación, con el siguiente contenido:

~~~
var express = require('express')
var router = express.Router()

// middleware que es específico para este enrutador
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
// define la ruta de la página principal
router.get('/', function (req, res) {
    res.send('Birds home page')
})
// define la ruta de /about
router.get('/about', function (req, res) {
    res.send('About birds')
})

module.exports = router
~~~

A continuación, cargue el módulo de direccionador en la aplicación:

~~~
var birds = require('./birds')

// ...

app.use('/birds', birds)
~~~

La aplicación ahora podrá manejar solicitudes a */birds* y */birds/about*, así como invocar la función de middleware *timeLog* que es específica de la ruta.


## Utilización del middleware

Express es una infraestructura web de direccionamiento y middleware que tiene una funcionalidad mínima propia: una aplicación Express es fundamentalmente una serie de llamadas a funciones de middleware.

Las funciones de middleware son funciones que tienen acceso al [objeto de solicitud](http://expressjs.com/es/4x/api.html#req) (*req*), al [objeto de respuesta](http://expressjs.com/es/4x/api.html#res) (*res*), y a la siguiente función de middleware en el ciclo de solicitud/respuestas de la aplicación. La siguiente función de middleware se denota normalmente con una variable denominada *next*.

Las funciones de middleware pueden realizar las siguientes tareas:

* Ejecutar cualquier código.
* Realizar cambios en la solicitud y los objetos de respuesta.
* Finalizar el ciclo de solicitud/respuestas.
* Invocar la siguiente función de middleware en la pila.

Si la función de middleware actual no finaliza el ciclo de solicitud/respuestas, debe invocar *next()* para pasar el control a la siguiente función de middleware. De lo contrario, la solicitud quedará colgada.

Una aplicación Express puede utilizar los siguientes tipos de middleware:

* [Middleware de nivel de aplicación](http://expressjs.com/en/guide/using-middleware.html#middleware.application)
* [Middleware de nivel de direccionador](http://expressjs.com/en/guide/using-middleware.html#middleware.router)
* [Middleware de manejo de errores](http://expressjs.com/en/guide/using-middleware.html#middleware.error-handling)
* [Middleware incorporado](http://expressjs.com/en/guide/using-middleware.html#middleware.built-in)
* [Middleware de terceros](http://expressjs.com/es/guide/using-middleware.html#middleware.third-party)

Puede cargar middleware de nivel de aplicación y de nivel de direccionador con una vía de acceso de montaje opcional. También puede cargar una serie de funciones de middleware a la vez, lo que crea una subpila del sistema de middleware en un punto de montaje.

### Middleware de nivel de aplicación

Enlace el middleware de nivel de aplicación a una instancia del [objeto de aplicación](http://expressjs.com/en/4x/api.html#app) utilizando las funciones *app.use()* y *app.METHOD()*, donde *METHOD* es el método HTTP de la solicitud que maneja la función de middleware (por ejemplo, GET, PUT o POST) en minúsculas.

Este ejemplo muestra una función de middleware sin ninguna vía de acceso de montaje. La función se ejecuta cada vez que la aplicación recibe una solicitud.

~~~
    var app = express()

    app.use(function (req, res, next) {
        console.log('Time:', Date.now())
        next()
    })
~~~

Este ejemplo muestra una función de middleware montada en la vía de acceso */user/:id*. La función se ejecuta para cualquier tipo de solicitud HTTP en la vía de acceso */user/:id*.

~~~
    app.use('/user/:id', function (req, res, next) {
        console.log('Request Type:', req.method)
        next()
    })
~~~

Este ejemplo muestra una ruta y su función de manejador (sistema de middleware). La función maneja las solicitudes GET a la vía de acceso */user/:id*.

~~~
    app.get('/user/:id', function (req, res, next) {
        res.send('USER')
    })
~~~

A continuación, se muestra un ejemplo de carga de una serie de funciones de middleware en un punto de montaje, con una vía de acceso de montaje. Ilustra una subpila de middleware que imprime información de solicitud para cualquier tipo de solicitud HTTP en la vía de acceso */user/:id*.

~~~
    app.use('/user/:id', function (req, res, next) {
        console.log('Request URL:', req.originalUrl)
        next()
    }, function (req, res, next) {
        console.log('Request Type:', req.method)
        next()
    })
~~~

Los manejadores de rutas permiten definir varias rutas para una vía de acceso. El ejemplo siguiente define dos rutas para las solicitudes GET a la vía de acceso */user/:id*. La segunda ruta no dará ningún problema, pero nunca se invocará, ya que la primera ruta finaliza el ciclo de solicitud/respuestas.

Este ejemplo muestra una subpila de middleware que maneja solicitudes GET a la vía de acceso */user/:id*.

~~~
    app.get('/user/:id', function (req, res, next) {
        console.log('ID:', req.params.id)
        next()
    }, function (req, res, next) {
        res.send('User Info')
    })

    // handler for the /user/:id path, which prints the user ID
    app.get('/user/:id', function (req, res, next) {
        res.end(req.params.id)
    })
~~~

Para omitir el resto de las funciones de middleware de una pila de middleware de direccionador, invoque *next('route')* para pasar el control a la siguiente ruta. **NOTA**: *next('route')* sólo funcionará en las funciones de middleware que se hayan cargado utilizando las funciones *app.METHOD()* o *router.METHOD()*.

Este ejemplo muestra una subpila de middleware que maneja solicitudes GET a la vía de acceso */user/:id*.

~~~
    app.get('/user/:id', function (req, res, next) {
        // if the user ID is 0, skip to the next route ruta
        if (req.params.id === '0') next('route')
        // otherwise pass the control to the next middleware function in this stack
        else next()
    }, function (req, res, next) {
        // render a regular page
        res.render('regular')
    })

    // handler for the /user/:id path, which renders a special page
    app.get('/user/:id', function (req, res, next) {
        res.render('special')
    })
~~~

### Middleware de nivel de enrutador

El middleware de nivel de direccionador funciona de la misma manera que el middleware de nivel de aplicación, excepto que está enlazado a una instancia de *express.Router()*.

~~~
    var router = express.Router()
~~~

Cargue el middleware de nivel de direccionador utilizando las funciones *router.use()* y *router.METHOD()*.

El siguiente código de ejemplo replica el sistema de middleware que se ha mostrado anteriormente para el middleware de nivel de aplicación, utilizando el middleware de nivel de direccionador:

~~~
    var app = express()
    var router = express.Router()

    // a middleware function with no mount path. This code is executed for every request to the router
    router.use(function (req, res, next) {
        console.log('Time:', Date.now())
        next()
    })

    // a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
    router.use('/user/:id', function (req, res, next) {
        console.log('Request URL:', req.originalUrl)
        next()
    }, function (req, res, next) {
        console.log('Request Type:', req.method)
        next()
    })

    // a middleware sub-stack that handles GET requests to the /user/:id path
    router.get('/user/:id', function (req, res, next) {
        // if the user ID is 0, skip to the next router
        if (req.params.id === '0') next('route')
        // otherwise pass control to the next middleware function in this stack
        else next()
    }, function (req, res, next) {
        // render a regular page
        res.render('regular')
    })

    // handler for the /user/:id path, which renders a special page
    router.get('/user/:id', function (req, res, next) {
        console.log(req.params.id)
        res.render('special')
    })

    // mount the router on the app
    app.use('/', router)
~~~

### Middleware de manejo de errores

> El middleware de manejo de errores siempre utiliza ***cuatro*** argumentos. Debe proporcionar cuatro argumentos para identificarlo como una función de middleware de manejo de errores. Aunque no necesite utilizar el objeto *next*, debe especificarlo para mantener la firma. De lo contrario, el objeto *next* se interpretará como middleware normal y no podrá manejar errores.

Defina las funciones de middleware de manejo de errores de la misma forma que otras funciones de middleware, excepto con cuatro argumentos en lugar de tres, específicamente con la firma *(err, req, res, next)*:

~~~
    app.use(function (err, req, res, next) {
        console.error(err.stack)
        res.status(500).send('Something broke!')
    })
~~~

Para obtener detalles sobre el middleware de manejo de errores, consulte: [manejo de errores](http://expressjs.com/en/guide/error-handling.html).

### Middleware incorporado

Desde la versión 4.x, Express ya no depende d [Connect](https://github.com/senchalabs/connect?_ga=1.195056937.409263619.1487198698). Excepto express.static, todas las funciones de middleware que se incluían previamente con Express están ahora en módulos diferentes. Consulte [la lista de funciones de middleware](https://github.com/senchalabs/connect?_ga=1.196647465.409263619.1487198698#middleware).

~~~
    express.static(root, [options])
~~~

La única función de middleware incorporado en Express es express.static. Esta función se basa en [serve-static](https://github.com/expressjs/serve-static?_ga=1.119551629.409263619.1487198698) y es responsable del servicio de activos estáticos de una aplicación Express.

El argumento *root* especifica el directorio raíz desde el que se realiza el servicio de activos estáticos.

El objeto *options* opcional puede tener las siguientes propiedades:

| Propiedad      | Descripción                                                                      | Tipo     | Valor predeterminado |
| -------------- | -------------------------------------------------------------------------------- | -------- | -------------------- |
| *dotfiles*     | Opción para el servicio de dotfiles. Los valores posibles son “allow”, “deny” e “ignore”.   | Serie | “ignore” |
| *etag*         | Habilitar o inhabilitar la generación de etag.                                   | Booleano | *true*               |
| *extensions*   | Establece las reservas de extensiones de archivos.                               | Matriz   | []                   |
| *index*        | Envía el archivo de índices de directorios. Establézcalo en *false* para inhabilitar la indexación de directorios. | Mixto | “index.html” |
| *lastModified* | Establezca la cabecera *Last-Modified* en la última fecha de modificación del archivo en el sistema operativo. Los valores posibles son *true* o *false*. | Booleano | *true* |
| *maxAge*       | Establezca la propiedad max-age de la cabecera Cache-Control en milisegundos o una serie en [formato ms](https://www.npmjs.org/package/ms). | Número | 0 |
| *redirect*     | Redireccionar a la “/” final cuando el nombre de vía de acceso es un directorio. | Booleano | *true*               |
| setHeaders     | Función para establecer las cabeceras HTTP que se sirven con el archivo.         | Función  |

A continuación, se muestra un ejemplo de uso de la función de middleware *express.static* con un objeto de opciones elaboradas:

~~~
    var options = {
        dotfiles: 'ignore',
        etag: false,
        extensions: ['htm', 'html'],
        index: false,
        maxAge: '1d',
        redirect: false,
        setHeaders: function (res, path, stat) {
            res.set('x-timestamp', Date.now())
        }
    }
    
    app.use(express.static('public', options))
~~~

Puede tener más de un directorio estático para cada aplicación:

~~~
    app.use(express.static('public'))
    app.use(express.static('uploads'))
    app.use(express.static('files'))
~~~

Para obtener más detalles sobre la función serve-static y sus opciones, consulte la documentación de [serve-static](https://github.com/expressjs/serve-static?_ga=1.88947230.409263619.1487198698).

### Middleware de terceros

Utilice el middleware de terceros para añadir funcionalidad a las aplicaciones Express.

Instale el módulo Node.js para la funcionalidad necesaria y cárguelo en la aplicación a nivel de aplicación o a nivel de direccionador.

El siguiente ejemplo ilustra la instalación y carga de la función de middleware de análisis de cookies *cookie-parser*.

~~~
    $ npm install cookie-parser
~~~

~~~
    var express = require('express')
    var app = express()
    var cookieParser = require('cookie-parser')

    // load the cookie-parsing middleware
    app.use(cookieParser())
~~~

Para ver una lista parcial de las funciones de middleware de terceros que más se utilizan con Express, consulte: [Middleware de terceros](http://expressjs.com/en/resources/middleware.html).


## Documentación de Router

Un objeto enrutador es una instancia aislada de *middleware* y rutas. Puedes imaginártelo como una "mini aplicación", únicamente capaz de realizar funciones de *middleware* y de enrutamiento. Toda aplicación *Express* tiene una aplicación enrutador empotrada.

Un enrutador se comporta como el propio *middleware*, de forma que puedes usarlo como un argumento de [*app.use()*](http://expressjs.com/en/4x/api.html#app.use) o como argumento de otro método [*use()*](http://expressjs.com/en/4x/api.html#router.use) de enrutador.

El objeto de nivel superior *express* tiene un método [*Router()*](http://expressjs.com/en/4x/api.html#express.router) que crea un nuevo objeto enrutador.

Una vez que has creado un objeto enrutador, puedes añadirle rutas de métodos *middleware* y HTTP (como get, put, post, etc) como a una apliación. Por ejemplo:

~~~
    // invoked for any requests passed to this router
    router.use(function(req, res, next) {
        // .. some logic here .. like any other middleware middleware
        next();
    });

    // will handle any request that ends in /events
    // depends on where the router is "use()'d"
    router.get('/events', function(req, res, next) {
        // ..
    });
~~~

Después puedes usar un enrutador para una URL raíz en particular de forma que separa tus rutas dentro de archivos o incluso mini-apps.

~~~
    // only requests to /calendar/* will be sent to our "router"
    app.use('/calendar', router);
~~~

### Métodos

#### router.all(path, [callback, ...] callback)

Este método es como los métodos *router.METODO()*, excepto que iguala todos los métodos HTTP (verbos).

Este método es extremadamente útil para mapear la lógica "global" para prefijos de *path* específicos o coincidencias arbitrarias. Por ejemplo, si situaste la siguiente ruta sobre el resto de definiciones de ruta, requerirá que todas las rutas desde ese punto requerirán autenticación, y automáticamente cargar un usuario. Ten en mente que estas llamadas de vuelta no tienen que actuar como *endpoints*; *loadUser* puede realizar una tarea, después llamar a *next()* para continuar igualando rutas posteriores.

~~~
    router.all('*', requireAuthentication, loadUser);
~~~

O el equivalente:

~~~
    router.all('*', requireAuthentication)
    router.all('*', loadUser);
~~~

Otro ejemplo de ésto es la funcionalidad "global" listada en blanco. A continuación se puede ver un ejemplo parecido al anterior, pero solo restringe *paths* con el prefijo "*/api*":

~~~
    router.all('/api/*', requireAuthentication);
~~~

#### router.METODO(path, [callback, ...] callback)

Los métodos *router.METODO()* proporcionan las funcionalidades de enrutamiento en *Express*, donde METODO es uno de los métodos HTTP, como GET, PUT, POST, etc en minúsculas. Así, los métodos reales son *router.get()*, *router.post()*, *router.put()*, etc.

> la función*router.get()* se llama automáticamente para el método HTTP *HEAD* además del método GET si *router.head()* no fue llamado por el *path* antes de *router.get()*.

Puedes proporcionar múltiples llamadas de vuelta y todas son tratadas por igual, y se comportan como un *middleware*, excepto que estas llamadas pueden invocar a *next('ruta') para evitar las llamadas de vuelta de rutas restantes. Puedes usar este mecanismo para realizar pre-condiciones en una ruta y después pasar el control a rutas posteriores cuando n hay razón para proceder con el la ruta igualada.

El siguiente fragmento ilustra la definición de ruta más simple posible. *Express* traduce las cadenas *path* a expresiones regulares, usadas internamente para igualar peticiones entrantes. Las cadenas de consulta ***no*** son consideradas cuando se realizan estas comparaciones, por ejemplo "*GET /*" igualaría la siguiente ruta, como lo haría "*GET /?name=tobi*".

~~~
    router.get('/', function(req, res){
        res.send('hello world');
    });
~~~

También puedes usar expresiones regulares, útiles si tienes restricciones muy específicas, por ejemplo el siguiente código igualaría con "*GET /commits/71dbb9c*" así com con "*GET /commits/71dbb9c..4c084f9*".

~~~
    router.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, function(req, res){
        var from = req.params[0];
        var to = req.params[1] || 'HEAD';
        res.send('commit range ' + from + '..' + to);
    });
~~~

#### router.param(name, callback)

Añade disparadores de llamadas de vuelta a los parámetros de ruta, donde *name* es el nombre del parámetro y *callback* es la función de llamada de vuelta. Aunque *name* técnicamente es opcional, usar este método sin él está obsoleto desde *Express v4.11.0* (ver más abajo).

Los parámetros de la función de llamada de vuelta son:

* *req*, el objeto petición.
* *res*, el objeto respuesta.
* *next*, indica la próxima función *middleware*.
* Valor del parámetro *name*.
* Nombre del parámetro.

> A diferencia de *app.param()*, *router.param()* no acepta un array de parámetros de ruta.

Por ejemplo, cuando *:user* está presente en el *path* de una ruta, puedes asignar la lógica de carga del usuario para automáticamente proporcionar *req.user* a la ruta, o realizar validaciones en los parámetros de entrada.

~~~
    router.param('user', function(req, res, next, id) {

        // try to get the user details from the User model and attach it to the request object
        User.find(id, function(err, user) {
            if (err) {
                next(err);
            } else if (user) {
                req.user = user;
                next();
            } else {
                next(new Error('failed to load user'));
            }
        });
    });
~~~

Los parámetros función de devolución de llamada son locales al enrutador en el que se definen. No son heredadas por aplicaciones montadas o enrutadores. Por lo tanto, los parámetros devolución de llamada de finidos en *router* serán disparadas solamente por parámetros de ruta definidos en rutas *router*.

Un parámetro devolución de llamada será llamado solo una vez por ciclo petición-respuesta, incluso si el parámetros coincide en múltiples rutas, como se muestra en los siguientes ejemplos.

~~~
    router.param('id', function (req, res, next, id) {
        console.log('CALLED ONLY ONCE');
        next();
    });

    router.get('/user/:id', function (req, res, next) {
        console.log('although this matches');
        next();
    });

    router.get('/user/:id', function (req, res) {
        console.log('and this matches too');
        res.end();
    });
~~~

En *GET /user/42* se imprime lo siguiente:

~~~
CALLED ONLY ONCE
although this matches
and this matches too
~~~

> La siguiente sección describe *router.param(callback)*, que está obsoleto desde v4.11.0.

El comportamiento del método *router.param(name, callbacl)* puede ser alterado completamente pasando solo una función a *router.param()*. Esta función es una implementación personalizada de cómo *router.param(name, callback)* se debería comportar - acepta dos parámetros y debe devolver un *middleware*.

El primer parámetro de esta función es el nombre del parámetro URL que debe ser capturado, el segundo parámetro puede ser cualquier objeto JavaScript que podrá ser usado para devolver la implementación del *middleware*.

El *middleware* devuelto por la función decide el comportamiento de qué pasa cuando un parámetro URL es capturado.

En este ejemplo, la nomenclatura *router.param(name, callback)* es modificada a *router.param(name, accessId)*. En lugar de aceptar un nombre y una llamada de vuelta, *router.param()* ahora aceptará un nombre y un número.

~~~
    var express = require('express');
    var app = express();
    var router = express.Router();

    // customizing the behavior of router.param()
    router.param(function(param, option) {
        return function (req, res, next, val) {
            if (val == option) {
                next();
            }
            else {
                res.sendStatus(403);
            }
        }
    });

    // using the customized router.param()
    router.param('id', 1337);

    // route to trigger the capture
    router.get('/user/:id', function (req, res) {
        res.send('OK');
    });

    app.use(router);

    app.listen(3000, function () {
        console.log('Ready');
    });
~~~

En este ejemplo, la nomenclatura de *router.param(name, callback)* sigue siendo la misma, pero en lugar de una devolución de llamada *middleware*, se ha definido una función de comprobación de tipo de dato personalizada para validarel tipo de dato del id del usuario.

~~~
    router.param(function(param, validator) {
        return function (req, res, next, val) {
            if (validator(val)) {
                next();
            }
            else {
                res.sendStatus(403);
            }
        }
    });

    router.param('id', function (candidate) {
        return !isNaN(parseFloat(candidate)) && isFinite(candidate);
    });
~~~

#### router.route(path)

Devuelve una instancia de una ruta única que puedes usar para manejar verbos HTTP con *middleware* opcional. Usa *router.route()* para evitar nombres de rutas duplicadas y errores tipográficos.

Partiendo del ejemplo anterior de *router.param()*, el siguiente código mustra cómo usar *router.route()* para especificar varios manejadores de métodos HTTP.

~~~
    var router = express.Router();

    router.param('user_id', function(req, res, next, id) {
        // sample user, would actually fetch from DB, etc...
        req.user = {
            id: id,
            name: 'TJ'
        };
        next();
    });

    router.route('/users/:user_id')
    .all(function(req, res, next) {
        // runs for all HTTP verbs first
        // think of it as route specific middleware!
        next();
    })
    .get(function(req, res, next) {
        res.json(req.user);
    })
    .put(function(req, res, next) {
        // just an example of maybe updating the user
        req.user.name = req.params.name;
        // save user ... etc
        res.json(req.user);
    })
    .post(function(req, res, next) {
        next(new Error('not implemented'));
    })
    .delete(function(req, res, next) {
        next(new Error('not implemented'));
    });
~~~

Este enfoque reutiliza el *path* */users/:user_id* y añade manejadores para varios métodos HTTP.

> NOTA: Cuando usas *router.route()*, las peticiones *middleware* se basan en cuándo se crea la ***ruta***, no en cuándo los manejadores de métodos con añadidos a la ruta. Con este propósito, puedes considerar que los manejadores de métodos pertenecen a la ruta a la que fueron añadidos.

#### router.use([path], [function, ...] function)

Usa la función o funciones *middleware* especificadas, con un *path* de montaje opcional, que por defecto es "*/*".

Este método es similar a [*app.use()*](http://expressjs.com/en/4x/api.html#app.use). A continuación se describe un caso de uso simple de ejemplo. Vea [*app.use()*](http://expressjs.com/en/4x/api.html#app.use) para más información.

El *middleware* es como una tubería de fontanería: las peticiones empiezan en la primera función *middleware* definida y trabaja a su manera "bajando" por la pila *middleware* procesando cada *path* que igualan.

~~~
    var express = require('express');
    var app = express();
    var router = express.Router();

    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    router.use(function(req, res, next) {
        console.log('%s %s %s', req.method, req.url, req.path);
        next();
    });

    // this will only be invoked if the path starts with /bar from the mount point
    router.use('/bar', function(req, res, next) {
        // ... maybe some additional /bar logging ...
        next();
    });

    // always invoked
    router.use(function(req, res, next) {
        res.send('Hello World');
    });

    app.use('/foo', router);

    app.listen(3000);
~~~

El *path* de "montaje" se despoja y no es visible para la función *middleware*. El efecto principal de esta característica es que una función *middleware* montada puede operar sin cambios de código independientemente de su "prefijo" nombre de ruta.

El orden en el que defines *middleware* con *router.use()* es muy importante. Son invocadas secuencialmente, así el orden define la precedencia del *middleware*. Por ejemplo, normalmente un registrador es el primer *middleware* que se usa, de forma que cada petición sea registrada.

~~~
    var logger = require('morgan');

    router.use(logger());
    router.use(express.static(__dirname + '/public'));
    router.use(function(req, res){
        res.send('Hello');
    });
~~~

Ahora supón que quieres ignorar las peticiones de registro para archivos estáticos, pero continuar registrando rutas y *middleware* definido después de *logger()*. Simplemente tienes que mover la llamada a *express.static()* a la parte superior, antes de añadir el *middleware* de resgistro:

~~~
    router.use(express.static(__dirname + '/public'));
    router.use(logger());
    router.use(function(req, res){
        res.send('Hello');
    });
~~~

Otro ejemplo es servir archivos desde múltiples directorios, dando precedencia a "*./public*" sobre los otros:

~~~
    app.use(express.static(__dirname + '/public'));
    app.use(express.static(__dirname + '/files'));
    app.use(express.static(__dirname + '/uploads'));
~~~

El método *router.use()* también soporta parámetros con nombre para que tus puntos de montaje para otros enrutadores puedan beneficiarse de la precarga usando parámetros con nombre.

**NOTA**: Aunque estas funciones *middleware* son añadidas mediante un enrutador particular, ***cuándo*** se ejecutan está definido por el *path* al que están ligados (no el enrutador). Por lo tanto, el *middleware* añadido mediante un enrutador podría ejecutarse para otros enrutadores si su ruta coincide. Por ejemplo, este código muestra dos enrutadores diferentes montados en el mismo *path*:

~~~
    var authRouter = express.Router();
    var openRouter = express.Router();

    authRouter.use(require('./authenticate').basic(usersdb));

    authRouter.get('/:user_id/edit', function(req, res, next) { 
        // ... Edit user UI ...
    });
    openRouter.get('/', function(req, res, next) { 
        // ... List users ...
    })
    openRouter.get('/:user_id', function(req, res, next) { 
        // ... View user ...
    })

    app.use('/users', authRouter);
    app.use('/users', openRouter);
~~~

Aunque el *middleware* de autenticación fue añadido a través de *authRouter* será ejecutado en la ruta definida por el *openRouter* ya que ambos enrutadores fueron montados en */users*. Para evitar este comportamiento, usa *paths* diferentes para cada enrutador.
