#!/usr/bin/env sh
echo "woohoo! we are deploying!!!"
rsync -av --exclude=.git /Users/LOGIN/code/sfmoviemap/* leia:/home/valerie/prj/sfmoviemap
echo ""
