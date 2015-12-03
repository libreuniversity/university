#!/bin/bash

success "watching"

# Watch with grunt
grunt --base ./ --gruntfile ./static/gruntfile.js watch &>./logs/watch.log &