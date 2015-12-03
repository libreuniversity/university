
message() {
  echo -e - $1
}

success() {
  message "\e[32m$1\e[0m"
}

warn() {
  message "\e[33m$1\e[0m"
}

error() {
  message "\e[31m$1\e[0m"
}