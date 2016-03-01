#!/bin/bash

success "watching"

# Watch with grunt
if [[ $* == *--show* ]]; then
  grunt --base ./ --gruntfile ./static/gruntfile.js watch
else
  grunt --base ./ --gruntfile ./static/gruntfile.js watch &>./logs/watch.log &
fi
