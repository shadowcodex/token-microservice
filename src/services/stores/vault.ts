import SecretStore from "./secret-store";
import vault from "vault-api";

function async put(id: string, secret: string): boolean {
  let res = await vault({
    method: "write",
    path: id,
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

function async get(id: string): string | undefined {
  let res = await vault({
    method: "read",
    path: id,
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
