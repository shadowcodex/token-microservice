import { JWTRequest } from "../jwt";

interface SecretStore {
  get: (
    applicationid: string,
    type: string,
    userid: string,
    serviceid?: string
  ) => Promise<SecretStoreResponse | undefined>;
  put: (
    applicationid: string,
    type: string,
    userid: string,
    serviceid: string,
    secret: string
  ) => Promise<boolean>;
}

interface SecretStoreSecret {
  type: string;
  serviceid: string;
  secret: string;
}

class SecretStoreResponse {
  userid: string;
  secrets: SecretStoreSecret[];

  constructor(userid: string) {
    this.userid = userid;
    this.secrets = [];
  }

  response() {
    return {
      userid: this.userid,
      secrets: JSON.stringify(this.secrets),
    };
  }
}

export { SecretStore, SecretStoreResponse, SecretStoreSecret };
