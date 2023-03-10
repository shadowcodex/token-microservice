import {
  SecretStore,
  SecretStoreResponse,
  SecretStoreSecret,
} from "./secret-store";
import vault from "vault-api";
import { VaultResponse } from "vault-api/dist/types";
import logger from "../logging";

const put = async (
  applicationid: string,
  type: string,
  userid: string,
  serviceid: string,
  secret: string
): Promise<boolean> => {
  let res = await vault({
    method: "write",
    path: `secret/${applicationid}/${userid}/${type}/${serviceid}`,
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
};

interface CustomVaultResponse extends VaultResponse {
  serviceid: string;
}

const get = async (
  applicationid: string,
  type: string,
  userid: string,
  serviceid?: string
): Promise<SecretStoreResponse | undefined> => {
  let res: CustomVaultResponse[] = [];
  try {
    logger.info(`internal - serviceid: ${serviceid}`);
    if (serviceid) {
      logger.info(
        `internal - single token for app:${applicationid} || user: ${userid}`
      );
      let vaultResponse = (await vault({
        method: "read",
        path: `secret/${applicationid}/${userid}/${type}/${serviceid}`,
      })) as CustomVaultResponse;

      vaultResponse.serviceid = serviceid;
      res.push(vaultResponse as CustomVaultResponse);
    } else {
      logger.info(
        `internal - multi token for app:${applicationid} || user: ${userid}`
      );
      let secrets = await vault({
        method: "list",
        path: `secret/${applicationid}/${userid}/${type}`,
      });

      let secretsPromises: Promise<CustomVaultResponse>[] = [];
      
      (secrets.data["keys"]).forEach((secret) => {
        secretsPromises.push(
          vault({
            method: "read",
            path: `secret/${applicationid}/${userid}/${type}/${secret}`,
          }).then((vaultResponse: CustomVaultResponse) => {
            vaultResponse.serviceid = secret;
            return vaultResponse;
          }) as Promise<CustomVaultResponse>
        );
      });

      res.concat(await Promise.all(secretsPromises));
    }
  } catch (err) {
    logger.error(err, "getVaultSecret get tokens");
    return undefined;
  }

  try {
    let response = new SecretStoreResponse(userid);

    res.forEach((value) => {
      if (value && value.statusCode == 200 && "secret" in value.data) {
        response.secrets.push({
          secret: value.data["secret"] as string,
          serviceid: value.serviceid,
        } as SecretStoreSecret);
      } else {
        throw new Error("bad status code");
      }
    });

    return response;
  } catch (err) {
    logger.error(err, "getVaultSecret create response");
    return undefined;
  }
};

function initVault(): SecretStore {
  let store: SecretStore = {
    put: put,
    get: get,
  };

  return store;
}

export default initVault;
