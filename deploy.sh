#!/usr/bin/env sh

set -e

npm run dev

cd dist

git init
git add -A
git commit -m "deploy"
git push -f git@github:com:pragmatic-reviews