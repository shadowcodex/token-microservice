#!/bin/bash
## Requires openssl, nodejs, jq

header='{
  "kid": "6F501184-D8D4-4F35-AF41-C50AF7781070",
  "alg": "RS256",
  "typ": "JWT"
}'
payload='{
  "iss": "https://token-microservice.com",
  "sub": "user-id-12356",
  "aud": "token-microservice",
  "serviceToken": "1234.1234.6543211",
  "applicationID": "1289579187509101",
  "serviceID": "github-002",
  "exp": 1735689600,
  "iat": 1678336569
}'

function pack() {
  # Remove line breaks and spaces
  echo $1 | sed -e "s/[\r\n]\+//g" | sed -e "s/ //g"
}

function base64url_encode {
  (if [ -z "$1" ]; then cat -; else echo -n "$1"; fi) |
    openssl base64 -e -A |
      sed s/\\+/-/g |
      sed s/\\//_/g |
      sed -E s/=+$//
}

# just for debugging
function base64url_decode {
  INPUT=$(if [ -z "$1" ]; then echo -n $(cat -); else echo -n "$1"; fi)
  MOD=$(($(echo -n "$INPUT" | wc -c) % 4))
  PADDING=$(if [ $MOD -eq 2 ]; then echo -n '=='; elif [ $MOD -eq 3 ]; then echo -n '=' ; fi)
  echo -n "$INPUT$PADDING" |
    sed s/-/+/g |
    sed s/_/\\//g |
    openssl base64 -d -A
}

if [ ! -f private-key.pem ]; then
  # Private and Public keys
  openssl genrsa 2048 > private-key.pem
  openssl rsa -in private-key.pem -pubout -out public-key.pem
fi

b64enc() { openssl enc -base64 -A | tr '+/' '-_' | tr -d '='; }
json() { jq -c . | LC_CTYPE=C tr -d '\n'; }
rs_sign() { openssl dgst -binary -sha256 -sign private-key.pem; }

HEADER_PAYLOAD="$(json <<<"$header" | b64enc).$(json <<<"$payload" | b64enc)"
PEM=$( cat private-key.pem )
signature=$(echo -n $HEADER_PAYLOAD | rs_sign "$PEM" | b64enc)
# Export JWT
echo $HEADER_PAYLOAD.$signature > jwt.txt
# Create JWK from public key
if [ ! -d ./node_modules/pem-jwk ]; then
  # A tool to convert PEM to JWK
  npm install --global pem-jwk
fi
jwk=$(npx pem-jwk public-key.pem)
# Add additional fields
jwk=$(echo '{"use":"sig"}' $jwk $header | jq -cs add)
# Export JWK
echo '{"keys":['$jwk']}'| jq . > jwks.json

echo "--- JWT ---"
cat jwt.txt
echo -e "\n--- JWK ---"
jq . jwks.json