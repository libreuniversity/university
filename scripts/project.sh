#!/bin/bash

# Reference
# - check if process running: http://askubuntu.com/q/157779/47254
# - check if command is successful: http://askubuntu.com/q/29370/47254
# - bash colors: http://misc.flogisoft.com/bash/tip_colors_and_formatting
# - what is 2>&1 http://stackoverflow.com/q/818255/938236

source ./scripts/config.sh
source ./scripts/output.sh

# The function that loads a file from the scripts if there's none
# It is an alias AND a function (to be used similarly within the other bash)
project () {
  # Execute the requested script
  if [ -f ./scripts/$1.sh ]; then
    source ./scripts/$1.sh
  else
    if [ -f ./scripts/$1 ]; then
      source ./scripts/$1
    else
      echo "Action '$1' doesn't exist"
    fi
  fi
}

# When this file is called, introduce the alias
project $1 $2 $3 $4
