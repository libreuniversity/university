# Libre University

This is the alpha source code for Libre University ([www.libre.university](https://www.libre.university/)). More documentation at some point in time.


## Install

You need to install a bunch of things first to run this. Before, you'll need **Node.js** (> 7.6), **NPM** and **MongoDB** installed (and MongoDB running). **Once you have those installed**, execute this in the terminal to install Libre University:

```bash
# Clone the repository  
git clone git://github.com/libreuniversity/university.git && cd ./university

# Install the dependencies:
npm install
```



## Run it

You can run it in different ways after installing it:

### Just run it

For running a local copy you can just do this:

```bash
npm start
```

### Server refresh

If you want to listen for changes in the Node.js server and update the server accordingly, then use nodemon:

```bash
nodemon
```

### Full-stack refresh

If you also want to listen for changes on the front-end files (style and javascript), we recommend using this specially built script. However, it's a bit slower, so we don't recommend it for back-end:

```bash
npm run watch
```
