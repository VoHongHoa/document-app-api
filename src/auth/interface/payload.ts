export enum RoleEnum {
  ADMIN = 'Admin',
  USER = 'User',
}

export interface JWTPayload {
  id: string;
  role: string;
}
