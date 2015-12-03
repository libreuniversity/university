#!/bin/bash

# Start mongodb
project start-mongo

# Test the project
npm test

# Stop mongodb if needed
if [ $mongowasstarted = false ]; then
  project stop-mongo
else
  success "mongo is still running"
fi