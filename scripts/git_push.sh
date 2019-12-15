#!/usr/bin/env sh

repo="sequelize-orm"
dir="dist"
autor="Bizhev"


# STOP error
set -e

#yarn generate
#cd $dir

# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m "$*"


# git push -f git@github.com:$autor/$autor.github.io.git master
git push -f git@github.com:$autor/$repo.git master:master
#cd ..
#rm -rf $dir