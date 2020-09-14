#!/usr/bin/env bash

OPERATION=$1;

FILENAME='/etc/bash.bashrc';
IS_ENV_PARAM_DECLARED=false;
HOST_ID=''
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

if [[ $OPERATION == 'generate' ]]; then
  HOST_ID=echo uuidgen; #dont want the \n at the back
  echo $HOST_ID;
fi