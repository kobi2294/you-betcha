export type UserRole = 'user' | 'trustee' | 'super';

export interface AuthClaims {
  readonly role: UserRole;
  readonly userGroups: string[];
  readonly adminGroups: string[];
}

export interface AuthToken extends AuthClaims {
  readonly id: string;

  readonly email: string;
}
