#!/bin/sh
## Requires openssl, nodejs, jq

header='
{
  "kid": "6F501184-D8D4-4F35-AF41-C50AF7781070",
  "alg": "RS256"
}'
payload='
{
  "iss": "https://token-microservice.com",
  "sub": "user-id-12356",
  "aud": "token-microservice",
  "serviceToken": "1234.1234.123345",
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

# Base64 Encoding
b64_header=$(pack "$header" | base64url_encode)
b64_payload=$(pack "$payload" | base64url_encode)
signature=$(echo -n $b64_header.$b64_payload | openssl dgst -sha256 -sign private-key.pem | base64url_encode)
# Export JWT
echo $b64_header.$b64_payload.$signature > jwt.txt
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