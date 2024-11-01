#!/bin/sh

set -xe

RELEASE_DATE=$1

git node release --prepare --skipBranchDiff
# We use it to not specify the branch name as it changes based on
# the commit list (semver-minor/semver-patch)
git config push.default current
git push upstream
echo "/## $RELEASE_DATE/,/^<a id=/{ if (!/^<a id=/) print }" > temp.awk
awk -f temp.awk doc/changelogs/CHANGELOG_V23.md > pr-body.md
gh pr create --body-file pr-body.md
# TODO: ammend with proposal PR
