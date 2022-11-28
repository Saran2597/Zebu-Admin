const path = require('path');
// Read the version field.
const packageVersion = require('./package.json').version;

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[fullhash].bundle.js?ver=1.6.4',
        // chunkFilename can be used to append the package version
        chunkFilename: `[name]-${packageVersion}.js`
    },
};