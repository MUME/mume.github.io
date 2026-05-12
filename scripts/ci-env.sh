#!/bin/bash

# Set VITE_LAST_UPDATED from last git commit
export VITE_LAST_UPDATED=$(git log -1 --format=%cd --date=format:'%B %Y')
echo "VITE_LAST_UPDATED=$VITE_LAST_UPDATED" >> $GITHUB_ENV

OWNER="${GITHUB_REPOSITORY_OWNER:-mume}"
REPO=$(echo "${GITHUB_REPOSITORY:-${OWNER}/mume.github.io}" | cut -d'/' -f2)

# Set VITE_HOSTNAME from CNAME file if it exists
if [ -f CNAME ] && [ "$OWNER" = "mume" ]; then
  CNAME_VAL=$(tr -d '[:space:]' < CNAME)
  export VITE_HOSTNAME="https://$CNAME_VAL"
else
  # Fallback for PR previews if host/prefix are provided via env
  if [ -n "$PREVIEW_HOST" ]; then
    export VITE_HOSTNAME="https://${PREVIEW_HOST}${PREVIEW_PREFIX}"
  else
    # Fallback for forks or main repo without CNAME
    if [ "$OWNER" = "mume" ] && [ "$REPO" = "mume.github.io" ]; then
      export VITE_HOSTNAME="https://docs.mume.org"
    elif [ "$REPO" = "$OWNER.github.io" ]; then
      export VITE_HOSTNAME="https://$OWNER.github.io"
    else
      export VITE_HOSTNAME="https://$OWNER.github.io/$REPO"
    fi
  fi
fi
echo "VITE_HOSTNAME=$VITE_HOSTNAME" >> $GITHUB_ENV

# Explicitly set VITE_BASE=/ for the official production environment
if [ "$OWNER" = "mume" ] && [ "$REPO" = "mume.github.io" ]; then
  export VITE_BASE="/"
  echo "VITE_BASE=$VITE_BASE" >> $GITHUB_ENV
fi
