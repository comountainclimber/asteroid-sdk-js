import { u, wallet } from '@cityofzion/neon-js'
import { NeoCommon } from '.'
import { NetworkItem } from '../interfaces'

export class NeoContractIdentity {
  /**
   * gets the contract name
   * @param network
   * @param contractHash
   * @returns {Promise<any>}
   */
  static async getContractName(network: NetworkItem, contractHash: string): Promise<any> {
    const operation = 'getContractName'
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, [])
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return null
  }

  /**
   * have the identity contract do a dynamic invoke to the CNS registering itself
   */
  static async cnsRegister(network: NetworkItem, contractHash: string, contractNameService: string, wif: string): Promise<void> {
    const operation = 'registerContractName'
    const account = new wallet.Account(wif)

    const args = [u.reverseHex(contractNameService), account.publicKey]
    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  /**
   * Have the identity contract do a dynamic invoke to the CNS updating its scriptHash
   */
  static async cnsUpdate(network: NetworkItem, contractHash: string, contractNameService: string, wif: string): Promise<void> {
    const operation = 'updateContractAddress'
    const args = [u.reverseHex(contractNameService), wif]

    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  /**
   * Test whether an address is registered with CNS
   */
  static async cnsIntegration(network: NetworkItem, contractHash: string, contractNameService: string, defaultContact: string, wif: string): Promise<void | boolean> {
    // get contract name from deployed contract
    const contractName = await NeoCommon.getContractName(network, contractHash)

    const operation = 'GetAddress'
    const args = [u.str2hexstring(contractName as string)]
    const invocation = {
      scriptHash: contractNameService,
      operation,
      args,
    }

    // test if address exists on CNS
    const response = await NeoCommon.scriptInvocation(network, invocation)
    if (response.result.stack.length > 0 && response.result.stack[0].value !== '') {
      const currentAddress = u.reverseHex(response.result.stack[0].value.toString())
      if (currentAddress !== defaultContact) {
        // contract address has changed, update it
        await NeoContractIdentity.cnsUpdate(network, contractHash, contractNameService, wif)
      }
    } else {
      // address doesn't exist, register it
      await NeoContractIdentity.cnsRegister(network, contractHash, contractNameService, wif)
    }

    return false
  }

  /**
   * return the contract version
   * @param network
   * @param contractHash
   * @returns {Promise<number>}
   */
  static async contractVersion(network: NetworkItem, contractHash: string): Promise<number | null> {
    const operation = 'ContractVersion'
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, [])
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value
    }
    return null
  }

  /**
   * Test whether `identityId` exists on-chain
   */
  static async identityExists(network: NetworkItem, contractHash: string, identityId: string): Promise<boolean> {
    const operation = 'identityExists'
    const args = [u.str2hexstring(identityId)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    return NeoCommon.expectBoolean(response)
  }

  static async keyExistsForIdentity(network: NetworkItem, contractHash: string, identityId: string, targetKey: string): Promise<boolean> {
    const operation = 'keyExistsForIdentity'
    const args = [u.str2hexstring(identityId), targetKey]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    return NeoCommon.expectBoolean(response)
  }

  static async addKeyToIdentity(network: NetworkItem, contractHash: string, identityId: string, targetKey: string, permissionLevel: any, wif: string) {
    const operation = 'addKeyToIdentity'
    const account = new wallet.Account(wif)

    const args = [u.str2hexstring(identityId), account.publicKey, targetKey, permissionLevel]
    const response = await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
    return NeoCommon.expectBoolean(response)
  }

  static async getKeyPermissionLevel(network: NetworkItem, contractHash: string, identityId: string, targetKey: string): Promise<number> {
    const operation = 'getKeyPermissionLevel'
    const args = [u.str2hexstring(identityId), targetKey]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)

    if (response.result.stack.length > 0) {
      if (response.result.stack[0].value !== '') {
        return parseInt(u.reverseHex(response.result.stack[0].value.toString()), 16)
      }
    }
    return 0
  }

  static async setKeyPermissionLevel(network: NetworkItem, contractHash: string, identityId: string, targetKey: string, permissionLevel: any, wif: string): Promise<void> {
    const operation = 'setKeyPermissionLevel'
    const account = new wallet.Account(wif)

    const args = [u.str2hexstring(identityId), account.publicKey, targetKey, permissionLevel]
    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  static async deleteKeyFromIdentity(network: NetworkItem, contractHash: string, identityId: string, targetKey: string, wif: string): Promise<void> {
    const operation = 'deleteKeyFromIdentity'
    const account = new wallet.Account(wif)

    const args = [u.str2hexstring(identityId), account.publicKey, targetKey]
    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  static async deleteIdentity(network: NetworkItem, contractHash: string, identityId: string, adminKey: string, wif: string): Promise<void> {
    const operation = 'deleteIdentity'
    const args = [u.str2hexstring(identityId), adminKey]
    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  static async createIdentity(network: NetworkItem, contractHash: string, identityLabel: string, wif: string, secondOwnerPublicKey?: string): Promise<any> {
    const operation = 'createIdentity'
    const account = new wallet.Account(wif)

    const args = [u.str2hexstring(identityLabel), account.publicKey]
    if (secondOwnerPublicKey !== undefined) {
      args.push(secondOwnerPublicKey)
    }
    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  static async createObject(network: NetworkItem, contractHash: string, objectId: string, identityId: string, object: string, wif: string): Promise<any> {
    const operation = 'createObject'
    const account = new wallet.Account(wif)

    const args = [u.str2hexstring(objectId), u.str2hexstring(identityId), u.str2hexstring(object), account.publicKey]
    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  static async deleteObject(network: NetworkItem, contractHash: string, objectId: string, identityId: string, wif: string): Promise<any> {
    const operation = 'deleteObject'
    const account = new wallet.Account(wif)

    const args = [u.str2hexstring(objectId), u.str2hexstring(identityId), account.publicKey]
    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  static async grantObjectRole(network: NetworkItem, contractHash: string, objectId: string, identityId: string, permissionIdentity: string, role: string, wif: string): Promise<any> {
    const operation = 'grantObjectRole'
    const account = new wallet.Account(wif)

    const args = [u.str2hexstring(objectId), u.str2hexstring(identityId), u.str2hexstring(permissionIdentity), u.str2hexstring(role), account.publicKey]
    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  static async revokeObjectRole(network: NetworkItem, contractHash: string, objectId: string, identityId: string, permissionIdentity: string, role: string, wif: string): Promise<any> {
    const operation = 'revokeObjectRole'
    const account = new wallet.Account(wif)

    const args = [u.str2hexstring(objectId), u.str2hexstring(identityId), u.str2hexstring(permissionIdentity), u.str2hexstring(role), account.publicKey]

    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  static async updateObject(network: NetworkItem, contractHash: string, objectId: string, identityId: string, object: string, wif: string): Promise<any> {
    const operation = 'updateObject'
    const account = new wallet.Account(wif)

    const args = [u.str2hexstring(objectId), u.str2hexstring(identityId), u.str2hexstring(object), account.publicKey]

    await NeoCommon.contractInvocation(network, contractHash, operation, args, wif)
  }

  static async getObject(network: NetworkItem, contractHash: string, objectId: string): Promise<string | null> {
    const operation = 'getObject'

    const args = [u.str2hexstring(objectId)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return u.hexstring2str(response.result.stack[0].value)
    }
    return null
  }

  static async getObjectRoles(network: NetworkItem, contractHash: string, objectId: string, identityId: string): Promise<string | null> {
    const operation = 'getObjectRoles'
    const roleKeys = ['owner', 'write', 'setRole']
    const args = [u.str2hexstring(objectId), u.str2hexstring(identityId)]
    const response = await NeoCommon.invokeFunction(network, contractHash, operation, args)
    if (response.result.stack.length > 0) {
      return response.result.stack[0].value
    }
    return null
  }

  /*
  static async getObjectRoles(network: NetworkItem, contractHash: string, objectId: string, identityId: string, object: any, wif: string): Promise<any> {

  }
  */
}
