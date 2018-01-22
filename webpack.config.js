var config = {
   entry: './main.js',
   output: {
      path:'/',
      filename: 'index.js',
   },
   devServer: {
      inline: true,
      port: 9191,
      headers: {
            'Access-Control-Allow-Origin': '*'
            }

   },
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react'],
               plugins: ['syntax-decorators','transform-object-rest-spread']



            }
         },

      ]
   }
}
module.exports = config;
