#!/bin/bash

# Start mongodb if not started
project start-mongo

# Populate the database
message "populating..."
node scripts/auto-populate.js > ./logs/populate.log


# Stop mongodb if needed
if [ $mongowasstarted = false ]; then
  project stop-mongo
else
  success "mongo is still running"
fi