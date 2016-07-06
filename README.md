simple-artifact-store
===

<a href="https://www.npmjs.org/package/simple-artifact-store">
    <img src="https://badge.fury.io/js/simple-artifact-store.svg"
        align="right" alt="NPM version" height="18">
</a>

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
