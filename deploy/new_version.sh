#¡/bin/bash
export VERSION=$(cat deploy/VERSION)
ARRAY_VERSION=(${VERSION//./ })
VERSION_MAJOR=${ARRAY_VERSION[0]}
VERSION_MINOR=${ARRAY_VERSION[1]}
VERSION_CONSECUTIVE=${ARRAY_VERSION[2]}
VERSION_NEW_CONSECUTIVE=VERSION_CONSECUTIVE
VERSION_NEW_MINOR=VERSION_MINOR
let VERSION_NEW_CONSECUTIVE+=1   
echo "Se subirá de version ${VERSION} a ${VERSION_MAJOR}.${VERSION_MINOR}.${VERSION_NEW_CONSECUTIVE}"
echo ${VERSION_MAJOR}.${VERSION_NEW_MINOR}.${VERSION_NEW_CONSECUTIVE} > deploy/VERSION
echo ${VERSION_MAJOR}-${VERSION_NEW_MINOR}-${VERSION_NEW_CONSECUTIVE} > deploy/VERSION_UNDERSCORE
echo "URL es"
cat deploy/VERSION_UNDERSCORE

#Preparando mensaje de SLACK
export SLACK_CHANNEL=$(cat deploy/slack/CHANNEL)
export CLOUDSDK_CORE_PROJECT=$(cat deploy/gcp/CLOUDSDK_CORE_PROJECT)
export URL_DEPLOY=https://${VERSION_MAJOR}-${VERSION_MINOR}-${VERSION_NEW_CONSECUTIVE}-dot-${CLOUDSDK_CORE_PROJECT}.appspot-preview.com
echo "curl -X POST --data-urlencode 'payload={\"channel\": \"#${SLACK_CHANNEL}\", \"username\": \"DOMOTI\", \"text\": \"Se ha desplegado una nueva version de ${BRANCH} en ${URL_DEPLOY}\"}' ${SLACK_WEBHOOKS}" > deploy/slack/slack.sh
chmod +x deploy/slack/slack.sh
            