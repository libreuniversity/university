#!/bin/bash

# Start mongodb
project start-mongo

npm test


if [ $? -eq 0 ]; then

  # Add all of the changed files 
  git add . -A 1>>./logs/git.log 2>&1

  # Commit all of the changed files with the given string
  git commit -m "$2" 1>>./logs/git.log 2>&1
  
  success "saved"
else
  error "error testing, please fix it"
fi


# Stop mongodb if needed
if [ $mongowasstarted = false ]; then
  project stop-mongo
else
  success "mongo is still running"
fi