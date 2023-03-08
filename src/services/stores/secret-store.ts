type SecretStore = {
  get: (id: string) => Promise<string | undefined>;
  put: (id: string, secret: string) => Promise<boolean>;
};

export default SecretStore;
