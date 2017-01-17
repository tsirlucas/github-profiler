const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const bundle = require('./dist/bundler.js');

const proxy = httpProxy.createProxyServer({
    changeOrigin: true
});
const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 3000;
const publicPath = path.resolve(__dirname, 'dist');

app.use(express.static(__dirname));
app.use('/dist', express.static(publicPath));

if (!isProduction) {
    bundle();
    app.all('/build/*', (req, res) => {
        proxy.web(req, res, {
            target: 'http://localhost:8080'
        });
    });
}

proxy.on('error', () => {
    console.log('Could not connect to proxy, please try again...');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
