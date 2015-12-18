
# Start node
if pgrep "node" > /dev/null
then
  warn "node is already running"
  nodewasstarted=true
else
  if [[ $* == *--show* ]]; then
    nodemon
  else
    nohup nodemon </dev/null &>./logs/node.log &
  fi
  if [ $? -eq 0 ]; then
    success "node started"
    nodewasstarted=false
  else
    error "error starting node: $?"
    nodewasstarted=true
  fi
fi
