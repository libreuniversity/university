#!/bin/bash


# Delete a log when requested
if [[ $* == *--delete* ]]; then
  if [[ $2 == *--delete* ]]; then
    for f in ./logs/*.log; do
      project log $f --delete
    done
  else
    if [ -f ./logs/$2.log ]; then
      echo -n "" > ./logs/$2.log
      success "deleted logs '$2.log'"
    elif [ -f $2 ]; then
      echo -n "" > $2
      success "deleted logs '$2'"
    else
      error "log '$2.log' doesn't exist as 'logs/$2.log'"
    fi
  fi
else
  if [ -f ./logs/$2.log ]; then
    success "log for $2.log:"
    cat ./logs/$2.log
  else
    warn "log '$2.log' doesn't exist as 'logs/$2.log'"
  fi
fi

