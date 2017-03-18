# ***GitBook***
## Qué es GitBook

  GitBook es una herramienta para crear documentación de proyectos y libros técnicos
  
## Cómo se utiliza

  Se trabaja, utilizando Markdown y Github.

  PASO 0: Hay que tener instalado node.js

  PASO 1: Crear con el comando mkdir un directorio gitbook donde trabajar:
~~~
    $ mkdir /PATH/TO/gitbook
    $ cd /PATH/TO/gitbook
~~~
   
   PASO 2: Ahora se necesita crear el package.json
~~~
    $ npm init
~~~

  No se necesita responder a las preguntas que el comando anterior pregunte, solo presionar enter. La información que se necesita se inyectará en el archivo package.json mediante el siguiente comando:
~~~
    $ npm install -g gitbook-cli --save
~~~
  
   PASO 3: Iniciar GitBook_
~~~
    $ gitbook init
~~~

Para crear los html

~~~
    $ gitbook build
~~~
    NOTA:
    GitBook permite probar el libro antes de empujarlo a la web con el comando:
~~~
    $ gitbook serve
~~~
## Cómo desplegar un libro


  PASO 1: Crear un nuevo fichero llamado book.js
~~~
    # Node rules:
    ### Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files).grunt
    ### Dependency directory
    ### Commenting this out is preferred by some people, see
    ### https://docs.npmjs.com/misc/faq#should-i-check-my-node_modules-folder-into-git node_modules/
    ### Book build output _book/
    ### eBook build output
    .epub
    .mobi
    .pdf
~~~

## Estructura de directorio

GitBook utiliza una estructura de directorios sencilla. Todos los archivos de Markdown / Asciidoc enumerados en el SUMMARy se transformarán en HTML. Los libros multilingües tienen una estructura ligeramente diferente.

Un GitBook básico suele ser algo como esto:
~~~
    .
    ├── book.json
    ├── README.md
    ├── SUMMARY.md
    ├── chapter-1/
    |   ├── README.md
    |   └── something.md
    └── chapter-2/
        ├── README.md
        └── something.md
~~~

Una visión general de lo que cada uno hace es:

| Fichero | Descripción |
| :--: | :--: |
|book.json	| Almacena datos de configuración (opcional)|
|README.md | Introducción para su libro (obligatorio)|
|SUMMARY.md | Tabla de contenido (opcional)|
|GLOSSARY.md | Léxico / Lista de términos para anotar (opcional)|