#!/usr/bin/env sh
echo "woohoo! we are deploying (And giving 777 permission to all images before putting them on the server)"
cd ..
cd img
chmod 777 *
# rsync -av --exclude=.git /Users/valerie.mettler/documents/code/sfmoviemap/* valerie_do:/home/valerie/prj/sfmoviemap
rsync -av --exclude=.git /Users/LOGIN/code/sfmoviemap/* leia:/home/valerie/prj/sfmoviemap
echo ""
