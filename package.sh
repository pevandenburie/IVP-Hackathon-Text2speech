#!/bin/sh

rm helloworld.tar.gz
tar -czf  helloworld.tar.gz --exclude=node_modules .
