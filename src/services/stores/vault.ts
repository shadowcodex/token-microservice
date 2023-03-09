import {SecretStore} from "./secret-store";
import vault from "vault-api";

const put =  async (id: string, secret: string): Promise<boolean> => {
  let res = await vault({
    method: "write",
    path: "secret/" + id,
    data: {
      secret: secret,
    },
  });

  if (res && res.statusCode == 200) {
    return true;
  } else {
    console.log(res.statusCode);
    return false;
  }
}

const get = async (id: string): Promise<string | undefined> => {
  let res = await vault({
    method: "read",
    path: "secret/" + id,
  });

  if (res && res.statusCode == 200 && "secret" in res.data) {
    return res.data["secret"] as string;
  } else {
    return undefined;
  }
}

function initVault(): SecretStore {
  let store: SecretStore = {
    put: put,
    get: get,
  };

  return store;
}

export default initVault;
