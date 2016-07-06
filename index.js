var express = require('express');
var path = require('path');
var fs = require('fs');

var port = process.argv[2] || 8080;
var dir = './uploads';

ensureUploadDir();

express()
    .use(express.static(dir))
    .use(function(req, res, next) {
        if (req.method === 'GET') {
            console.log("Not found", req.path);
            res.status(404).send("This is not the file you are looking for");
        } else {
            next();
        }
    })

    .use(function(req, res, next) {
        if (req.method === 'PUT') {
            var filename = getFilename(req.path);
            return req
                .on('end', function() {
                    respondFileCreated(req, res, filename);
                })
                .on('error', next)
                .pipe(fs.createWriteStream(path.join(dir, filename)));
        }

        next(new Error("Sorry, I don't understand this"));
    })
    .use(function(err, req, res, next) {
        if (err) {
            console.log(err);
            res.status(400).send(err.message);
        }
    })
    .listen(port, function(err) {
        console.log('Listening on %d, serving files from %s', port, dir);
    });

function ensureUploadDir() {
    try {
        fs.accessSync(dir, fs.F_OK);
    } catch (_) {
        fs.mkdirSync(dir);
    }
}

function respondFileCreated(req, res, filename) {
    var targetUrl = fileUrl(req, filename);
    console.log("Uploading", filename);
    res.status(201).header('Location', targetUrl).send('Stored under ' + targetUrl);
}

function getFilename(pathname) {
    return path.basename(pathname);
}

function fileUrl(req, filename) {
    var hostUrl = req.protocol + '://' + req.get('host');
    return hostUrl + '/' + filename;
}
