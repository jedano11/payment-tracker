#!/usr/bin/env bash -xe

DEV="dev"
PROD="prod"

if [ "$1" == ${DEV} ] || [ "$1" == ${PROD} ]
then
  ENV=$1
  ENV_PATH=env/${ENV}
  echo "Setting to ${ENV} environment"
  unset ENVFILE
  echo "unset environment variables"
  cp -rf ${ENV_PATH}/ios/pre-build.sh ios
  chmod +x ios/pre-build.sh ios
  echo "copied pre-build shell dir"
  export ENVFILE=${ENV_PATH}/.env
  echo "assigned env file"
  echo "Setting to ${ENV} environment - DONE"
elif [ "$1" == "clean" ]
then
  echo "Cleaning environment settings"
  unset ENVFILE
  rm -f ios/scripts/pre-build.sh
  echo "Cleaning environment settings - DONE"
elif [ "$1" == "envs" ]
then
  echo $DEV
  echo $PROD
else
  echo "Run ‘appcenter-post-clone.sh envs’ to list available environments."
fi
