#!/bin/bash

# Simple script to start app.js for hello world service

# kill previously running service
kill -9 `cat app_pid.txt`

# Start in background and pipe and append output to file
nohup node app.js >> app.log 2>&1 &

# Save PID to kill on restart
echo $! > app_pid.txt

