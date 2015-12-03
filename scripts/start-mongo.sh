#!/bin/bash

# Start mongodb
if pgrep "mongod" > /dev/null
then
  warn "mongodb is already running"
  mongowasstarted=true
else
  mongod --fork --logpath ./logs/mongo.log --logappend > /dev/null
  if [ $? -eq 0 ]; then
    success "mongodb started"
    mongowasstarted=false
  else
    error "error starting mongodb: $?"
    mongowasstarted=true
  fi
fi