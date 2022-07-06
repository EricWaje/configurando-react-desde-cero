# Que es webpack? ⚛️

[Webpack](https://webpack.js.org/) es un empaquetador de aplicaciones.
Empaquetar se refiera a que va a recuperar todos los modulos y todas las partes de tu aplicacion web y va a crear un archivo distribuible para dárselo a un navegador y que el usuario pueda leerlo sin problema.

-   Toda aplicacion tiene un punto de entrada, un primer script que se ejecuta y se va construyendo todo lo demas.

## Pasos a seguir para crear proyecto desde cero

1. Crear una carpeta para el proyecto

2. Inicializar npm en ese proyecto

```
npm init
```

3. Crear carpeta "src" y dentro un punto de entrada "index.js"

4. Instalamos webpack

```
 npm install --save-dev webpack webpack-cli
```

6. Hacemos npm run build para que webpack compile todo el proyecto.

7. Cambia en package.json el modo a desarrollo. "webpack --mode=development"

8. Vovlemos a correr el comando npm run build.

    - Webpack por defecto entiende que nuestro punto de entrada de la aplicación se encuentra dentro de src y se llama index.js. Esto se debe a que es un patron muy comun.
      Y por defecto webpack crea una carpeta dist que es donde se va a guardar el archivo que se va a generar.

9. Para modificar las configuraciones de webpack creamos el archivo webpack.config.js

10. Si quisieramos cambiar el output de la aplicacion, podemos hacerlo en el archivo de configuración de webpack.
    - Para conseguir una ruta absoluta en node debemos hacer
    ```javascript
        require('path').resolve(\_\_dirname, 'build')
    ```

\_\_dirname es un variable que lo que hace es saber en que ruta se encuentra el archivo que le indicamos

```javascript
const path = require('path');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'build'),
    },
};
```

11. Instalamos react y react-dom

```
npm i react react-dom
```

12. Cambiamos nuestro archivo index.js por lo qu deberíamos utilizar en react

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

13. Creamos el App.js y lo exportamos por default

```javascript
import React from 'react';

const App = () => {
    return (
        <div>
            <h2>Creando app desde cero</h2>
        </div>
    );
};

export default App;
```

14. Si corremos el build nos va a salir un error que no va a reocnocer el token "<>". Necesito algo más en webpack para que entienda la sintaxis.

## Acá viene Babel 😎

Babel es un transpilador de código.  
Un transpilador te permite escribir un programa en determinada sintaxis, la agarra y la transofrma a una sitaxis válida de ese lenguaje real.

### Que es un loader o un cargador?

Es una biblioteca que se encarga de cargar un archivo y convertirlo en un objeto que webpack puede tratar.
Que loader necesitamos? El que nos provee [Babel](https://babeljs.io/).  
Create-react-app funciona con babel por defecto.

Como se configura un loader? 🤔

15. Deberíamos ir a nuestro archivo de config de webpack y además del output ahora agregar un "module" con una lista ([]) de reglas ("rules") dentro.
    Dentro de las rules le indicamos la terminación de archivos dentro de 'test', el loader que queremos utilizar que va a ser 'babel-loader' y las opciones y configuraciones que le querramos pasar a ese loader "options".

```javascript
module: {
            rules: [
                //reglas para js
                //utilizamos regex para la finalización de archivos
                {
                    test: /\.js$/, //   /.(js|jsx)$/
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-react',
                                {
                                    runtime: 'automatic',
                                },
                            ],
                        ],
                    },
                },

            ],
        },
```

presets: ['@babel/preset-react']
Es una configuracion pre-establecida que va a hacer todas las transformaciones necesarias en nuestro archivo para convertirlo a javascript.

16. Instalar babel + los presets

```
npm i @babel/core babel-loader @babel/preset-react --save-dev
```

17. Si quisieramos sacar el import React from 'react' deberíamos agregar al preset un obj con runtime: 'automatic'

18. Luego deberíamos también controlar dentro de rules las extensiones de css tal como hicimos con javascript para que webpack pueda cargar los archivos css.

```
npm i style-loader css-loader --save-dev
```

```javascript
{
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
},
```

Por último creamos un style.css dentro de src y luego lo importamos en el index.js

19. Instalamos plug in para que nos cree un html en el build

```
npm i html-webpack-plugin --save-dev
```

Añadimos el plugin en las configuraciones de webpack y le pasamos un template que va a ser el archivo que se va a generar.

```javascript
plugins: [new HtmlWebpackPlugin({ template: 'src/index.html' })],
```

20. Ahora vamos a crear el entorno de desarrollo con webpack

```
npm i webpack-dev-server --save-dev
```

y luego en el package.json agregamos las líneas

```
"dev":"webpack serve --mode=development"
```

21. Configuramos el devServer en la config de webpack con las opciones que querramos.

```javascript
devServer:
{
    open: true, //abre en el navegador por defecto
    port: 3000, //eligo el puerto
    compress: true, //comprime el archivo para el servidor
    client: {
    //para mostrar errores y warnings en pantalla
        overlay: {
        warnings: false,
        errors: true,
        },
    },
},
```

22. Por último pasamos nuestra configuración como si fuera una función para poder extraer el modo y así decirle a webpack que si estamos en modo producción haga un hash de nuestro output y sino que lo llame "main.js.

```
"scripts": {
        "build": "webpack --mode=production",
        "dev": "webpack serve --mode=development",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
```

```javascript
module.exports = (env, argv) => {
    const { mode } = argv;
    const isProduction = mode === 'production';
    return {
        output: {
            filename: isProduction ? '[name].[contenthash].js' : 'main.js',
            path: path.resolve(__dirname, 'build'),
        },
        //.....
    };
    //...
};
```

El [name] va a ser "main" en nuestro caso y el [contenthash] lo que hace es que dependiendo el contenido que tenga ese fichero va a añadirle un hash diferente. Cuando cambie ese contenido, el hash de ese fichero será otro
