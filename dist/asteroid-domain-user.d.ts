import { LoggerOptions } from 'node-log-it';
import { UpdatePasswordTokenType, ConnectionNetworkType, ConnectionNetworkConfig, GetVersionResponse, UserAttribute, UserAttributeHeader, ProfilePrivItem, UserProfile, ModifyProfileItem, ModifyProfileComponentItem, UserLogHeader, UserLog, AttributeClaimItem } from './interfaces';
export interface AsteroidDomainUserOptions {
    networkType?: ConnectionNetworkType;
    networkConfig?: ConnectionNetworkConfig;
    accessToken?: string;
    refreshToken?: string;
    autoUpdateTokens?: boolean;
    id?: string;
    loggerOptions?: LoggerOptions;
}
export declare class AsteroidDomainUser {
    private options;
    private currentAccessToken;
    private currentRefreshToken;
    private logger;
    constructor(options?: AsteroidDomainUserOptions);
    get baseUrl(): string;
    get accessToken(): string | undefined;
    get refreshToken(): string | undefined;
    get id(): string;
    setAccessToken(token: string): void;
    setRefreshToken(token: string): void;
    getVersionInfo(): Promise<GetVersionResponse>;
    registerEmail(email: string): Promise<void>;
    registerEmailWithSecret(email: string, secret: string): Promise<string>;
    updatePassword(password: string, dynamicToken: string, tokenType: UpdatePasswordTokenType): Promise<void>;
    updatePasswordJwt(password: string): Promise<void>;
    requestPasswordReset(email: string): Promise<void>;
    loginEmail(email: string, password: string): Promise<void>;
    loginOauth(provider: string, oauthPayload: object): Promise<void>;
    setUserGroupByEmail(email: string, group: string): Promise<void>;
    newAccessToken(): Promise<void>;
    logout(): Promise<void>;
    createAttributes(attributes: UserAttribute[]): Promise<UserAttribute[]>;
    updateAttributes(attributes: UserAttribute[]): Promise<UserAttribute[]>;
    deleteAttributes(attributes: UserAttribute[]): Promise<UserAttribute[]>;
    getAttributeHeadersByTypes(types: string[]): Promise<UserAttributeHeader[]>;
    getAttributesByIds(attributeHeaders: UserAttributeHeader[]): Promise<UserAttribute[]>;
    createProfile(remark: string): Promise<string>;
    deleteProfile(profileId: string): Promise<void>;
    getOwnedProfileHeaders(): Promise<UserProfile[]>;
    modifyProfileComponents(modifyProfileItems: ModifyProfileItem[]): Promise<ModifyProfileComponentItem[]>;
    getProfileById(profileId: string): Promise<UserProfile>;
    getFlatProfileById(profileId: string): Promise<UserProfile>;
    updateProfile(profileId: string, remark: string): Promise<void>;
    getProfileByToken(token: string): Promise<UserProfile>;
    createProfilePrivToken(profileId: string, remark: string, active?: boolean): Promise<ProfilePrivItem>;
    getProfilePrivs(profileId: string): Promise<ProfilePrivItem[]>;
    updateProfilePriv(privilegeId: string, remark: string, active: boolean): Promise<void>;
    deleteProfilePriv(privilegeId: string): Promise<void>;
    sendProfileTokenByEmail(privilegeId: string, targetEmails: string[], message: string): Promise<void>;
    getLogHeadersByTypes(types: string[], startTimestamp: number, endTimestamp: number): Promise<UserLogHeader[]>;
    getLogsByIds(logHeaders: UserLogHeader[]): Promise<UserLog[]>;
    getLatestLogsByTypes(types: string[]): Promise<UserLog[]>;
    submitWorkflowToken(dynamicToken: string): Promise<void>;
    createClaim(claim: AttributeClaimItem): Promise<void>;
    private validateOptionalParameters;
    private invokeOrRefreshToken;
}
