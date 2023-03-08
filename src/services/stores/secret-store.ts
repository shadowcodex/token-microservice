type SecretStore = {
  get: (id: string) => string | undefined;
  put: (id: string, secret: string) => boolean;
};

export default SecretStore;
