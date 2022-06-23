#!/bin/bash

set +x

FAAS_CFG_FILE=~/.cm4all-faas-project.conf

FUNCTION_NAME=$1
shift 1

FUNCTION_FILE=$1

if [[ -z "$FUNCTION_FILE" ]]; then
	echo "Usage: upload.sh [function-name] [filename(s)]"
	echo "Example:"
	echo "  ./upload.sh sign-test SignTest.js"
	exit 1
fi

if [[ ! -f ${FAAS_CFG_FILE} ]]; then
	echo "Config file ${FAAS_CFG_FILE} does not exist."
	echo "It must contain two lines:"
	echo "FAAS_PRODUCT_ID=..."
	echo "FAAS_API_KEY=..."
	exit 1
fi

source ${FAAS_CFG_FILE}


if [[ -z "${FAAS_PRODUCT_ID}" ]]; then
	echo "You need to define your FAAS_PRODUCT_ID in ${FAAS_CFG_FILE}"
	exit 1
fi

if [[ -z "${FAAS_API_KEY}" ]]; then
	echo "You need to define your FAAS_API_KEY in ${FAAS_CFG_FILE}"
	exit 1
fi

rm -f .tmp.zip

zip .tmp.zip $@ > /dev/null
DATA=`base64 -w 0 .tmp.zip 2> /dev/null`
if [[ ! "$?" -eq "0" ]]; then
		DATA=`base64 .tmp.zip 2> /dev/null`
fi
curl -s -X PUT --header "api-key: ${FAAS_API_KEY}" https://staging-api.cm4all.works/v1/functions/${FAAS_PRODUCT_ID}/functions/${FUNCTION_NAME}/code -H "Content-Type: application/json" -d "{ \"ZipFile\": \"${DATA}\" }" > /dev/null
rm -f .tmp.zip

