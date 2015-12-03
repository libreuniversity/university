# Stop node
if pgrep "node" > /dev/null
then

  # Stop node server
  killall node > /dev/null
  if [ $? -eq 0 ]; then
    success "node stopped"
  else
    error "error stopping mongodb: $?"
  fi
else
  warn "node is already stopped"
fi
