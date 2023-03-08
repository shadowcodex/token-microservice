import initVault from 'stores/vault'
import SecretStore from './stores/secret-store'

function getSecretStore(): SecretStore {
    let type = process.env.SECRET_SERVICE
    if (type && type == 'vault') {
        return initVault()
    } else {
        throw 'Invalid Secret Store type'
    }
}

export default getSecretStore