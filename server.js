const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({
    changeOrigin: true
});
const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 3000;
const publicPath = path.resolve(__dirname, 'dist');

app.use(express.static(__dirname));
app.use("/dist", express.static(publicPath));

if (!isProduction) {
    const bundle = require('./dist/bundler.js');
    bundle();
    app.all('/dist/build/*', function (req, res) {
        proxy.web(req, res, {
            target: 'http://localhost:8080'
        });
    });
}

proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
});

app.listen(port, function () {
    console.log('Server running on port ' + port);
});