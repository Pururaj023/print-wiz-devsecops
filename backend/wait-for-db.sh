#!/bin/sh
host="$DB_HOST"
user="$DB_USER"
pass="$DB_PASS"
db="$DB_NAME"

echo "Waiting for MySQL at $host..."
until mysql -h "$host" -u "$user" -p"$pass" "$db" -e "select 1" > /dev/null 2>&1; do
  echo "MySQL is unavailable - sleeping 2s"
  sleep 2
done

echo "MySQL is up - starting backend"
node server.js
