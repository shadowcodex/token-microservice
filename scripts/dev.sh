#!/usr/bin/env bash

function cleanup {
    echo "cleaning up"
    docker stop $(docker ps -q --filter ancestor=vault )
}

trap cleanup EXIT

# Start Hashicorp Vault
docker run --cap-add=IPC_LOCK \
        -e 'VAULT_DEV_ROOT_TOKEN_ID=myroot' \
        -e 'VAULT_DEV_LISTEN_ADDRESS=0.0.0.0:1234' \
        -p 8200:1234 \
        -d \
        vault

# Start nodemon
nodemon
