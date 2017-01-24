# Libre University

This is the alpha source code for Libre University ([www.libre.university](https://www.libre.university/)). More documentation soon.


## Install

You need to install a bunch of things first to run this. Before, you'll need **Node.js**, **NPM** and **MongoDB** installed (and MongoDB running). **Once you have those installed**, do this to install Libre University:

1. Clone the repository  

    `git clone git://github.com/libreuniversity/university.git && cd ./university`

1. Install the dependencies:

    `npm install`





## Run it

You can run it in different ways after installing it:

### Just run it

For running a local copy you can just do this:

```
npm start
```

### Server refresh

If you want to listen for changes in the Node.js server and update the server accordingly, then use nodemon:

```
nodemon
```

### Full-stack refresh

If you also want to listen for changes on the front-end files (style and javascript), we recommend using this specially built script. However, it's a bit slower, so we don't recommend it for back-end:

```
npm run watch
```
