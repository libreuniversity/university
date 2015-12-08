#!/bin/bash

# Test the project before deploying itw
project test

if [ $? -eq 0 ]; then
  
  message "publishing..."
  # Add all of the changed files 
  git push origin master 1>>./logs/publish.log 2>&1
  git push circle master 1>>./logs/publish.log 2>&1
  
  if [ $? -eq 0 ]; then
    success "published or up to date"
  else
    error "error publishing, displaying deploy log:"
    cat ./logs/publish.log
  fi
else
  error "error testing"
fi



