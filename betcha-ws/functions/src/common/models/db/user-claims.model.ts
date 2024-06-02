export const USER_ROLES = ['user', 'trustee', 'super'] as const;
export type UserRole = typeof USER_ROLES[number];

export interface AuthClaims {
  readonly role: UserRole;
  readonly userGroups: string[];
  readonly adminGroups: string[];
}

export interface AuthToken extends AuthClaims {
  readonly id: string;

  readonly email: string;
}
