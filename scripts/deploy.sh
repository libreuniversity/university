#!/bin/bash

# Test the project before deploying itw
project test

if [ $? -eq 0 ]; then
  
  message "deploying..."
  # Add all of the changed files 
  git push $hosting master 1>>./logs/deploy.log 2>&1
  
  if [ $? -eq 0 ]; then
    success "deployed or up to date"
  else
    error "error deploying, displaying deploy log:"
    cat ./logs/deploy.log
  fi
else
  error "error testing"
fi



