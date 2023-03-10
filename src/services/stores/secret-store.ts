
interface SecretStore {
  get: (userid: string, ?serviceid: string) => Promise<string | undefined>;
  put: (userid: string, secret: string) => Promise<boolean>;
}

export { SecretStore };
