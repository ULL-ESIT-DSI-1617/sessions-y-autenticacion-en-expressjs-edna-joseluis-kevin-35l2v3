# ***Autenticación y autorización mediante sesiones en Express***

La **autenticación** es el proceso por el cual se verifica que un usuario es realmente quien dice ser. Mientras que la **autorización** es el proceso por el cual se determina si el usuario tiene los privilegios necesarios para acceder a los recursos pedidos.

Ambos procesos podrían resolverse mediante el uso de cookies, pero existiría el problema de que éstas son visibles y podrían estar transportando información sensible del usuario, por lo que es mucho más adecuado el uso de sesiones.

El manejo de sesiones es muy importante en cualquier aplicación, ya que sin ello no podemos rastrear la actividad del usuario.


### Instalación

Como cualquier otro paquete de Node, es instalable vía ***npm***, así que lo instalaremos en el directorio ***node_modules*** de nuestra aplicación. Para ello seguimos los siguientes pasos:

1. Abrimos una terminal,
2. Navegamos hasta el directorio de la aplicación,
3. Ejecutamos el siguiente comando:
~~~sh
    $ npm install express-session
~~~
(Añadir la opción *--save* si se desea que la dependencia se guarde en el fichero *package.json*.)

[express-session](https://github.com/expressjs/session)


## Usando Express-Session

El siguiente código muestra un ejemplo muy simple de procesos de autenticación y autorización **usando sesiones en Express*. Para ver la página, el usuario primero tendrá que loguearse y su identidad será verificada y guardada en *session*. Cuando se llega al punto final de logout, se le revocará el acceso eliminando su identidad de la sesión.

~~~js
    var express = require('express'),
        app = express(),
        session = require('express-session');
    app.use(session({
        secret: '2C44-4D44-WppQ38S',
        resave: true,
        saveUninitialized: true
    }));

    // Authentication and Authorization Middleware
    var auth = function(req, res, next) {
        if (req.session && req.session.user === "amy" && req.session.admin)
            return next();
        else
            return res.sendStatus(401);
    };

    // Login endpoint
    app.get('/login', function (req, res) {
        if (!req.query.username || !req.query.password) {
            res.send('login failed');    
        } else if(req.query.username === "amy" || req.query.password === "amyspassword") {
            req.session.user = "amy";
            req.session.admin = true;
            res.send("login success!");
        }
    });

    // Logout endpoint
    app.get('/logout', function (req, res) {
        req.session.destroy();
        res.send("logout success!");
    });

    // Get content endpoint
    app.get('/content', auth, function (req, res) {
        res.send("You can only see this after you've logged in.");
    });

    app.listen(3000);
    console.log("app running at http://localhost:3000");
~~~

### Explicación del código

Se importa los módulos *express* y *express-session*. Se crea la aplicación y se añade *session* a la aplicación como una función middleware.

~~~js
    var express = require('express'),
        app = express(),
        session = require('express-session');
    app.use(session({
        secret: '2C44-4D44-WppQ38S',
        resave: true,
        saveUninitialized: true
    }));
~~~

Se define la función middleware de autenticación y autorización. Alcanza el siguiente paso si el usuario es *amy* y si éste accede como administrador.

>Los valores con los que se comprueba ésto son indicados manualmente para el propósito demostrativo de este ejemplo. Una aplicación web real obtendrá el usuario y su nivel de acceso de *sesión* y los comprobará frente a una base de datos en el servidor.

~~~js
    // Authentication and Authorization Middleware
    var auth = function(req, res, next) {
        if (req.session && req.session.user === "amy" &&  req.session.admin)
            return next();
        else
            return res.sendStatus(401);
    };
~~~

Siendo **localhost:3000/login?username=amy&password=amyspassword** la URL de login, se puede ver que ésta contiene el usuario y su nivel de acceso para la sesión. La sesión será diferente para cada usuario y única para un mismo usuario aunque use diferentes navegadores. Por ejemplo, si el mismo usuario se loguea usando Chrome y abre también FireFox, tendrá que loguearse otra vez en FireFox para tener acceso a los recursos protegidos.

>Con propósito demostrativo, ésta es una petición GET que pasa la información en los parámetros de la consulta. Una aplicación real siempre usará una petición POST mediante la cual pasará la información. De nuevo se ha introducido manualmente el usuario y su contraseña únicamente para el propósito demostrativo del ejemplo. Una aplicación web real comprobará el usuario y su contraseña frente a los datos almacenados en una base de datos del servidor.

~~~js
    // Login endpoint
    app.get('/login', function (req, res) {
        if (!req.query.username || !req.query.password) {
            res.send('login failed');    
        } else if(req.query.username === "amy" ||     req.query.password === "amyspassword") {
            req.session.user = "amy";
            req.session.admin = true;
            res.send("login success!");
        }
    });
~~~

Visitando **localhost:3000/logout** se destruye la sesión. Una vez se ha destruido la sesión, el usuario tendrá que acceder de nuevo a la URL de login para acceder a los recursos protegidos.

~~~js
    // Logout endpoint
    app.get('/logout', function (req, res) {
        req.session.destroy();
        res.send("logout success!");
    });
~~~

Visitando **localhost:3000/content** se accede a los recursos protegidos. La función de autenticación anterior se pasa en el segundo parámetro como un middleware antes de proceder a servir el contenido al usuario. Si la función de autenticación determina que el usuario no es válido, no alcanzará la tercera función para servir el contenido.

~~~js
    // Get content endpoint
    app.get('/content', auth, function (req, res) {
        res.send("You can only see this after you've logged in.");
    });
~~~

Finalmente, se lanza la aplicación escuchando en el puerto 3000.

~~~js
    app.listen(3000);
    console.log("app running at http://localhost:3000");
~~~
