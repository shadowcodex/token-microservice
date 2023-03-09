# Token Microservice

A small microservice to handle token state management.

## Work In Progress

This is currently in development and not functional yet. Will remove this section once functional version is done.

## What

This microservice implements a secure state management endpoint for managing tokens and refresh tokens so that backend system can always retrieve the latest token needed for any user and their given OAuth'd service.

## Security

1. Uses JWKS to validate requests from other backend services.
2. Returns signed JWT with latest token included
3. Tokens stored in Hashicorp Vault backed by AWS KMS.

> You should really only run this in your backend service protected by VPC / Firewalls / Service Perimeters. Not meant to be ran over open internet.

## Planned Supported Services

- Slack
- Github


## Planned endpoints

### Store Token

POST `/{service}`

**Body** = `JWT` => `asdf.asdf.asdf`

```json
Header:
{
  "alg": "HS256",
  "typ": "JWT"
}

PayLoad:
{
    "user":"<userID>",
    "token":"service token"
}
Signature: `Signature bytes`
```

**Response** = `ok` or `error`

![POST Sequence Diagram](out/docs/post/POST.png)

### Retrieve Token

GET `/{service}`

Body = `JWT` => `asdf.asdf.asdf`

```json
Header:
{
  "alg": "HS256",
  "typ": "JWT"
}

PayLoad:
{
    "user":"<userID>",
}
Signature: `Signature bytes`
```

**Response** = `error` or `JWT` => `asdf.asdf.asdf`

```json
Header:
{
  "alg": "HS256",
  "typ": "JWT"
}

PayLoad:
{
    "user":"<userID>",
    "service": "<serviceID>",
    "token": "<serviceToken>"
}
Signature: `Signature bytes`
```

![GET Sequence Diagram](out/docs/get/GET.png)
