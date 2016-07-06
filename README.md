simple-artifact-store
===

[![NPM version][npm-image]][npm-url]
[npm-image]: https://img.shields.io/npm/v/simple-artifact-store.svg?style=flat-square
[npm-url]: https://npmjs.org/package/simple-artifact-store

Simple artifact store that receives files via `PUT` and makes the available via `GET`.

Installation
---

```sh
npm install simple-artifact-store -g
```

Usage
---

#### Start server

``` shell
$ simple-artifact-store 8080

```

#### Send one file

``` shell
curl -T my.file http://localhost:8080/my.file
```

License
---

ISC
