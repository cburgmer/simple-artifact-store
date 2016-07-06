var name = 'putfile';
var debug = require('debug')(name);
var express = require('express');
var path = require('path');
var fs = require('fs');

var port = process.argv[2] || 8080;
var dir = './uploads';

express()
    .use(express.static(dir))

    .use(function(req, res, next) {
        debug('enter', req.method);
        next();
    })
    .use(function(req, res, next) {
        if (/PUT/.test(req.method)) {
            var filename = getFilename(req.path);
            debug('filename: %s, path: %s', filename, req.path);
            return req
                .on('end', function() {
                    debug('end');
                    respondFileCreated(req, res, filename);
                })
                .on('error', next)
                .pipe(fs.createWriteStream(path.join(dir, filename)));
        }

        next(new Error("Sorry, I don't understand this"));
    })
    .use(function(err, req, res, next) {
        if (err) {
            debug('err: %o', err);
            res.status(400).send(err.message);
        }
    })
    .listen(port, function(err) {
        console.log('Listening on %d, serving files from %s', port, dir);
    });

function respondFileCreated(req, res, filename) {
    var targetUrl = fileUrl(req, filename);
    res.status(201).header('Location', targetUrl).send('Stored under ' + targetUrl);
}

function getFilename(pathname) {
    return path.basename(pathname);
}

function fileUrl(req, filename) {
    var hostUrl = req.protocol + '://' + req.get('host');
    return hostUrl + '/' + filename;
}
