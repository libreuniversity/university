# Scripts and hooks

> This only works in Linux, but oh boy it's worth it


## Getting started

Run the following command and add it to the end of your ./bashrc so it's executed on startup:

```bash
alias project="/bin/bash ./scripts/project.sh"
```

## List of scripts

These are the available scripts:


### Start

```bash
project start  
```

Starts everything that is needed to get your project running. By default it's `mongod` and `nodemon`. They are started in the background and log to the `mongo.log` and `node.log` files respectively.


### Stop

```bash
project stop
```

Stops everything that was setup to run the server. By default it's `mongod` and `nodemon`.


### Save

```bash
project save "Message"
```

Adds and commits the changes with the given message or a default message.


### Deploy

```bash
project deploy
```

Pushes the code to the remote repository


### Log

```bash
project log NAME
project log NAME --delete
```

Show or delete the corresponding logs
