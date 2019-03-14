const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

function createHtmlWebpackPlugin(array, folder) {
  const newArray = array.map((_, index) => {
    return _.map(
      page =>
        new HtmlWebpackPlugin({
          title: page.title,
          inject: 'body',
          template: `src/pages/${folder}/u${index + 1}/${page.filename}.pug`,
          filename: `pages/${folder}/u${index + 1}/${page.filename}.html`
        })
    );
  });

  return [].concat(...newArray);
}

const options = {
  rootDir: process.cwd(),
  devBuild: process.env.NODE_ENV !== 'production'
};

const pages = [{ filename: 'homeworks', title: 'Homeworks' }],
  classExercisesPages = [
    [
      { filename: 'forms', title: 'Forms' },
      { filename: 'links', title: 'Links' },
      { filename: 'images', title: 'Images' },
      { filename: 'text-styles', title: 'Text styles' },
      { filename: 'tables', title: 'Tables' }
    ]
  ],
  homeworkPages = [
    [
      { filename: 'homework1', title: 'Style Matrix' },
      { filename: 'homework2', title: 'Curriculum' },
      { filename: 'homework3', title: 'Schedule' }
    ],
    [{ filename: 'homework1', title: 'Criba de Eratóstenes' }]
  ];

const scssLoader = {
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    exclude: /(node_module)/
  },
  pugLoader = {
    test: /\.pug$/,
    use: ['html-loader?minimize=false', 'pug-html-loader?pretty=true']
  },
  tsLoader = {
    test: /\.ts$/,
    use: ['ts-loader']
  };

const cfg = {
  node: {
    __dirname: true
  },
  // externals: [nodeExternals()],
  stats: 'errors-only',
  target: 'web',
  mode: 'development',
  entry: {
    app: path.join(__dirname, 'src', 'index.js')
  },
  module: {
    rules: [scssLoader, pugLoader, tsLoader]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'NachoCodeX',
      inject: 'body',
      template: 'src/index.pug'
    }),
    ...pages.map(
      page =>
        new HtmlWebpackPlugin({
          title: page.title,
          inject: 'body',
          template: `src/pages/${page.filename}.pug`,
          filename: `pages/${page.filename}.html`
        })
    ),
    ...createHtmlWebpackPlugin(classExercisesPages, 'class-exercises'),
    ...createHtmlWebpackPlugin(homeworkPages, 'homeworks'),
    new CopyWebpackPlugin([{ from: 'src/img', to: 'public/img' }]),
    new CopyWebpackPlugin([{ from: 'src/js', to: 'js' }])
  ]
};

module.exports = cfg;
