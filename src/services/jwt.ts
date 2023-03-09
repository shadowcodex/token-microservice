import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JwksClient } from "jwks-rsa";

interface JWTRequest extends Request {
  token: string | JwtPayload;
}

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO: replace with body request.
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("No token.");
    }

    const client = req.app.get("jwksClient") as JwksClient;

    const getKey = (header, callback) => {
      client.getSigningKey(header.kid, function (err, key) {
        var signingKey = key.getPublicKey();
        callback(null, signingKey);
      });
    };
    try {
      jwt.verify(token, getKey, (err, decoded) => {
        if (err) {
          throw new Error(err.message);
        } else {
          (req as JWTRequest).token = decoded;
          next();
        }
      });
    } catch (err) {
      throw new Error("Invalid auth token...");
    }
  } catch (err) {
    res.status(401).send("Invalid Authentication");
  }
};

const getJWKS = (): JwksClient => {
  const jwksUri = process.env.JWKS_URI;
  if (jwksUri) {
    return new JwksClient({
      jwksUri,
    });
  } else {
    throw new Error("Invalid JWKS URI in env...");
  }
};

export { getJWKS, validateJWT, JWTRequest };
