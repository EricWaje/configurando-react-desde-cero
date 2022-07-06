const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {
    const { mode } = argv;
    const isProduction = mode === 'production';
    return {
        output: {
            filename: isProduction ? '[name].[contenthash].js' : 'main.js',
            path: path.resolve(__dirname, 'build'),
        },
        plugins: [new HtmlWebpackPlugin({ template: 'src/index.html' })],
        module: {
            rules: [
                //reglas para js
                //utilizamos regex para la finalización de archivos
                //Las expresiones regulares son patrones utilizados para encontrar una determinada combinación de caracteres dentro de una cadena de texto.
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
                //reglas para css
                {
                    test: /\.css$/, //    /.(css|sass|scss)$/
                    use: ['style-loader', 'css-loader'],
                },
                //reglas para assets
                {
                    type: 'asset',
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                },
            ],
        },
        devServer: {
            open: true, //abre en el navegador por defecto
            port: 3000, //eligo el puerto
            compress: true,
            client: {
                //para mostrar errores y warnings en pantalla
                overlay: {
                    warnings: false,
                    errors: true,
                },
            },
        },
    };
};
