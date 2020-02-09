export type Role = 'admin' | 'manager' | 'user';

export interface User {
    uid: string;
    displayName: string;
    role: Role;
    email: string;
}
