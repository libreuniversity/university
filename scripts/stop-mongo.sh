
# Start mongod
if pgrep "mongod" > /dev/null
then
  mongod --shutdown > /dev/null
  if [ $? -eq 0 ]; then
    success "mongodb stopped"
  else
    error "error stopping mongodb: $?"
  fi
else
  warn "mongodb is already stopped"
fi
