export interface UserAudit {
    readonly id: string;    // user-id
    readonly displayName: string;
    readonly displayModeStandalone: boolean;
    readonly standalone: boolean;
    readonly timestamp: string;
    readonly version: string;

}