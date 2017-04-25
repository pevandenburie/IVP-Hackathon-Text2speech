#!/bin/sh

rm helloworld.tar.gz
tar -czf  helloworld.tar.gz --exclude=node_modules --exclude=app_pid.txt --exclude=*.tar.gz .
