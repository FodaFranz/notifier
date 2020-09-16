#!/usr/bin/env bash

OPERATION=$1;

FILENAME='/etc/bash.bashrc';
IS_ENV_PARAM_DECLARED=false;
HOST_ID=''
URL='http://localhost:3000'

while read line; do
  if [[ $line == "export NOTIFIERID="* ]]; then
    IS_ENV_PARAM_DECLARED=true;
    HOST_ID="${line//export NOTIFIERID=}";
    echo "Reading PC-ID from $FILENAME...";
    break;
  fi
done < $FILENAME

if [[ "$IS_ENV_PARAM_DECLARED" = false ]]; then
  UUID=$(uuidgen)
  HOST_ID=$UUID;
  echo "export NOTIFIERID=${UUID}" >> $FILENAME;
  echo "Generating PC-ID in $FILENAME...";
fi

echo "PC-ID: $HOST_ID";

if [[ $OPERATION == 'connect' ]]; then
  TARGET_ID=$2;
  curl --header "Content-Type: application/json" --request POST --data '{"host_id":"'"$HOST_ID"'"}' $URL/register/connect/$TARGET_ID
elif [ $OPERATION == 'disconnect' ]; then
  TARGET_ID=$2;
  curl --header "Content-Type: application/json" --request POST --data '{"host_id":"'"$HOST_ID"'"}' $URL/register/disconnect/$TARGET_ID
fi